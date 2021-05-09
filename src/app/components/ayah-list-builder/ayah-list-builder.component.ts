import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import range from 'lodash-es/range';
import chunk from 'lodash-es/chunk';
import { AyahRange } from 'src/app/core/models';
import { IdbService } from 'src/app/services/idb.service';
import { SettingService } from 'src/app/services/setting.service';
import { AudioService } from 'src/app/services/audio.service';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

const ListBuilderHotKeys = ['Space', 'ArrowLeft', 'ArrowRight'];
const ObserverArgs = {
  rootMargin: '1500px',
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
  private keyDownSubscription: Subscription = null;
  private observer: IntersectionObserver = null;

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

      if ([15, totalLengthOfAyahs].includes(ayahIndex)) {
        this.readyToShowAyahs = true;
        this.renderingAyahs = false;
      }
    }
  }

  reloadPage = () => window.location.reload();

  handleKeyDown = (ev: KeyboardEvent) => {
    if (this.readyToShowAyahs) {
      switch (ev.code) {
        case 'Space':
          this.audio.action('play_pause');
          break;
        case 'ArrowLeft':
          this.audio.action('skip_to_previous');
          break;
        case 'ArrowRight':
          this.audio.action('skip_to_next');
          break;
        case 'KeyD':
          ev.shiftKey && this.settings.toggleShowAbsoluteAyahId();
          break;
      }
    }
  };

  ngOnInit() {
    this.keyDownSubscription = fromEvent(document, 'keydown')
      .pipe(
        tap((ev: KeyboardEvent) => ListBuilderHotKeys.includes(ev.code) && ev.preventDefault()),
        throttleTime(100)
      )
      .subscribe(this.handleKeyDown);
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.observerCallback, ObserverArgs);
    this.observer?.observe(this.observerRef?.nativeElement);
  }

  ngOnChanges() {
    this.readyToShowAyahs = false;
    this.allAyahsRendered = false;
    this.ayahsToRender = [];
    this.totalAyahs = chunk(range(this.ayahRange.start, this.ayahRange.end + 1), 20);
    this.appendAyahs();
  }

  ngOnDestroy() {
    this.keyDownSubscription?.unsubscribe();
    this.observer?.disconnect();
  }
}
