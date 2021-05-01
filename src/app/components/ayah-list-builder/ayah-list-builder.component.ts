import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import range from 'lodash-es/range';
import chunk from 'lodash-es/chunk';
import { AyahRange, AyahReadyStateChange } from 'src/app/core/models';
import { IdbService } from 'src/app/services/idb.service';

@Component({
  selector: 'nq-ayah-list-builder',
  templateUrl: './ayah-list-builder.component.html',
  styleUrls: ['./ayah-list-builder.component.scss'],
})
export class AyahListBuilderComponent implements OnChanges {
  @Input('range') range: AyahRange;
  private totalAyahs = [];
  public ayahsToRender = [];
  private appendingAyahs: boolean;
  public ready = false;

  @ViewChild('observer') bottomObserver: ElementRef;

  constructor(public idb: IdbService) {}

  appendAyahs() {
    if (this.totalAyahs.length && !this.appendingAyahs) {
      this.appendingAyahs = true;
      this.ayahsToRender = [...this.ayahsToRender, ...this.totalAyahs[0]];
      this.totalAyahs.shift();
      this.appendingAyahs = false;
    }
  }

  handleAyahStateChange(state: AyahReadyStateChange) {
    if (!this.ready) {
      if (state.error) {
        console.error(state.error);
        return false;
      }
      const totalLengthOfAyahs = this.range.end - this.range.start + 1;

      if (state.index > 5 || state.index == totalLengthOfAyahs) {
        this.ready = true;
      }
    }
  }

  ngOnChanges() {
    this.ready = false;
    this.ayahsToRender = [];
    this.totalAyahs = chunk(range(this.range.start, this.range.end + 1), 10);
    this.appendAyahs();
  }

  upperSectionVisible = true;
  intersectionOptions = { rootMargin: '1500px' };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        this.appendAyahs();
      }
    });
  }, this.intersectionOptions);

  ngAfterViewInit() {
    this.observer.observe(this.bottomObserver.nativeElement);
  }
}
