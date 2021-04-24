import { ActivatedRoute } from '@angular/router';
import { getRangeForSurah } from 'src/app/core/functions';
import { Surahs } from '../../data/home';
import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AyahRange } from 'src/app/core/models';

@Component({
  selector: 'app-surah',
  templateUrl: './surah.component.html',
  styleUrls: ['./surah.component.scss'],
})
export class SurahComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}

  menuList = Surahs.map(({ englishName, index }) => ({
    englishName,
    index,
    route: `/${index}`,
  }));

  @ViewChild('observer') bottomObserver: ElementRef;
  public surahId: number;
  public range: AyahRange;
  public menuOpen = false;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.surahId = parseInt(params.surahId);
      this.range = getRangeForSurah(this.surahId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  headerElevated = false;
  intersectionOptions = { rootMargin: '250px' };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      this.headerElevated = !e.isIntersecting;
    });
  });

  ngAfterViewInit() {
    this.observer.observe(this.bottomObserver.nativeElement);
  }
}
