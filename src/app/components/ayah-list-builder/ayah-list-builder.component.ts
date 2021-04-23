import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { chunk, range } from 'lodash';

@Component({
  selector: 'nq-ayah-list-builder',
  templateUrl: './ayah-list-builder.component.html',
  styleUrls: ['./ayah-list-builder.component.scss'],
})
export class AyahListBuilderComponent implements OnChanges {
  @Input('start') start: number;
  @Input('end') end: number;
  private totalAyahs = [];
  public ayahs = [];
  private appendingAyahs: boolean;

  @ViewChild('observer') bottomObserver: ElementRef;

  constructor() {}

  appendAyahs() {
    if (this.totalAyahs.length && !this.appendingAyahs) {
      this.appendingAyahs = true;
      this.ayahs = [...this.ayahs, ...this.totalAyahs[0]];
      this.totalAyahs.shift();
      this.appendingAyahs = false;
    }
  }

  ngOnChanges() {
    this.ayahs = [];
    this.totalAyahs = chunk(range(this.start, this.end + 1), 10);
    this.appendAyahs();
  }

  upperSectionVisible = true;
  intersectionOptions = { rootMargin: '250px' };

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
