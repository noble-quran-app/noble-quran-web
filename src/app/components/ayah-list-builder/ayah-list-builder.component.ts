import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import range from 'lodash-es/range';
import chunk from 'lodash-es/chunk';
import { AyahRange } from 'src/app/core/models';
import { IdbService } from 'src/app/services/idb.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'ayah-list-builder',
  templateUrl: './ayah-list-builder.component.html',
  styleUrls: ['./ayah-list-builder.component.scss'],
})
export class AyahListBuilderComponent implements OnChanges {
  @Input() ayahRange: AyahRange;
  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;

  private totalAyahs = [];
  public ayahsToRender = [];
  private appendingAyahs: boolean;
  public readyToShowAyahs = false;
  public allAyahsRendered = false;
  readonly intersectionOptions = {
    rootMargin: '1500px',
  };

  @ViewChild('observer') bottomObserver: ElementRef;

  constructor(public idb: IdbService, public settings: SettingService) {}

  appendAyahs() {
    if (this.totalAyahs.length && !this.appendingAyahs) {
      this.appendingAyahs = true;
      this.ayahsToRender = this.ayahsToRender.concat(this.totalAyahs[0]);
      this.totalAyahs.shift();
      this.appendingAyahs = false;
    }
    if (!this.totalAyahs.length) {
      this.allAyahsRendered = true;
    }
  }

  handleAyahStateChange(state: [number, string]) {
    const [ayahIndex, error] = state;
    if (!this.readyToShowAyahs) {
      if (error) {
        console.error(error);
        return false;
      }
      const totalLengthOfAyahs = this.ayahRange.end - this.ayahRange.start;

      if (ayahIndex >= 15 || ayahIndex == totalLengthOfAyahs) {
        this.readyToShowAyahs = true;
      }
    }
  }

  ngOnChanges() {
    this.readyToShowAyahs = false;
    this.allAyahsRendered = false;
    this.ayahsToRender = [];
    this.totalAyahs = chunk(range(this.ayahRange.start, this.ayahRange.end + 1), 20);
    this.appendAyahs();
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && this.appendAyahs());
  }, this.intersectionOptions);

  ngAfterViewInit() {
    this.observer.observe(this.bottomObserver.nativeElement);
  }
}
