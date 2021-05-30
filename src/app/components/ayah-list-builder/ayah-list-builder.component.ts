import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import range from 'lodash-es/range';
import chunk from 'lodash-es/chunk';
import { AyahRange } from 'src/app/core/models';
import { IdbService } from 'src/app/services/idb.service';
import { SettingService } from 'src/app/services/setting.service';
import { AudioService } from 'src/app/services/audio.service';
import { fromEvent } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { SubSink } from 'subsink';

const HotKeys = {
  spacebar: 'Space',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  d: 'KeyD',
  pageDown: 'PageDown',
  pageUp: 'PageUp',

  // arrowDown: 'ArrowDown',
  // arrowUp: 'ArrowUp',
};

const ObserverArgs = {
  rootMargin: '500px',
};

@Component({
  selector: 'ayah-list-builder',
  templateUrl: './ayah-list-builder.component.html',
  styleUrls: ['./ayah-list-builder.component.scss'],
})
export class AyahListBuilderComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    public idb: IdbService,
    public settings: SettingService,
    public audio: AudioService
  ) {}

  @Input() ayahRange: AyahRange;
  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;
  @ViewChild('observer') observerRef: ElementRef;

  public ayahsToRender = [];
  public readyToShowAyahs = false;
  public allAyahsRendered = false;
  public renderingAyahs = true;
  public renderError = false;

  private totalAyahs = [];
  private observer: IntersectionObserver = null;
  private subs = new SubSink();

  observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => entry.isIntersecting && this.appendAyahs());
  };

  appendAyahs = () => {
    if (!this.totalAyahs.length) {
      this.allAyahsRendered = true;
      return false;
    }

    this.ayahsToRender = this.ayahsToRender.concat(this.totalAyahs[0]);
    this.totalAyahs.shift();
  };

  handleAyahStateChange(state: [number, string]) {
    const [ayahIndex, error] = state;
    if (!this.readyToShowAyahs && !this.renderError) {
      if (error) {
        console.error(error);
        this.renderError = true;
        this.renderingAyahs = false;
      }
      const totalLengthOfAyahs = this.ayahRange.end - this.ayahRange.start;

      if ([5, totalLengthOfAyahs].includes(ayahIndex)) {
        this.readyToShowAyahs = true;
        this.renderingAyahs = false;
      }
    }
  }

  reloadPage = () => window.location.reload();

  handleKeyDown = (ev: KeyboardEvent) => {
    if (this.readyToShowAyahs) {
      switch (ev.code) {
        case HotKeys.spacebar:
          this.audio.playPause();
          break;
        case HotKeys.arrowLeft:
          this.audio.skipToPreviousAyah();
          break;
        case HotKeys.arrowRight:
          this.audio.skipToNextAyah();
          break;
        case HotKeys.d:
          ev.shiftKey && this.settings.toggleShowAbsoluteAyahId();
          break;
        case HotKeys.pageUp:
          window.scrollBy(0, -80);
          break;
        case HotKeys.pageDown:
          window.scrollBy(0, 80);
          break;
      }
    }
  };

  ngOnInit() {
    this.subs.add(
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          tap((e) => Object.values(HotKeys).includes(e.code) && e.preventDefault()),
          throttleTime(100)
        )
        .subscribe(this.handleKeyDown)
    );

    this.idb.initialize();
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.observerCallback, ObserverArgs);
    this.observer?.observe(this.observerRef?.nativeElement);
  }

  ngOnChanges() {
    this.renderingAyahs = true;
    this.readyToShowAyahs = false;
    this.allAyahsRendered = false;
    this.ayahsToRender = [];
    this.totalAyahs = chunk(range(this.ayahRange.start, this.ayahRange.end + 1), 5);
    this.appendAyahs();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.subs.unsubscribe();
  }
}
