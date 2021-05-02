import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import range from 'lodash-es/range';
import chunk from 'lodash-es/chunk';
import { AyahRange, AyahReadyStateChange } from 'src/app/core/models';
import { IdbService } from 'src/app/services/idb.service';
import { Timer } from 'src/app/core/functions';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'ayah-list-builder',
  templateUrl: './ayah-list-builder.component.html',
  styleUrls: ['./ayah-list-builder.component.scss'],
})
export class AyahListBuilderComponent implements OnChanges {
  @Input() range: AyahRange;
  @Input() menuList;
  @Input() currentMenuItemIndex;

  private totalAyahs = [];
  public ayahsToRender = [];
  private appendingAyahs: boolean;
  public ready = false;
  public complete = false;
  public upperSectionVisible = true;
  private intersectionOptions = {
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
      this.complete = true;
    }
  }

  handleAyahStateChange(state: [number, string]) {
    const [ayahIndex, error] = state;
    if (!this.ready) {
      if (error) {
        console.error(error);
        return false;
      }
      const totalLengthOfAyahs = this.range.end - this.range.start + 1;

      if (ayahIndex > 5 || ayahIndex == totalLengthOfAyahs) {
        this.ready = true;
      }
    }
  }

  ngOnChanges() {
    this.ready = false;
    this.complete = false;
    this.ayahsToRender = [];
    this.totalAyahs = chunk(range(this.range.start, this.range.end + 1), 10);
    this.appendAyahs();
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && this.appendAyahs());
  }, this.intersectionOptions);

  ngAfterViewInit() {
    this.observer.observe(this.bottomObserver.nativeElement);
  }
}
