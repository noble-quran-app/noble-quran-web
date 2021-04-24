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
import { ThemeService } from 'src/app/services/theme.service';
import { NobleQuranThemes } from 'src/app/data/theme';

@Component({
  selector: 'app-surah',
  templateUrl: './surah.component.html',
  styleUrls: ['./surah.component.scss'],
})
export class SurahComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private route: ActivatedRoute, public theme: ThemeService) {}

  @ViewChild('observer') bottomObserver: ElementRef;

  public surahs = Surahs;
  public surahId: number;
  public range: AyahRange;
  public menuOpen = false;
  private subscription: Subscription;
  public headerElevated = false;
  public darkTheme = NobleQuranThemes.dark;

  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      this.headerElevated = !e.isIntersecting;
    });
  });

  toggleTheme() {
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.surahId = parseInt(params.surahId);
      this.range = getRangeForSurah(this.surahId);
    });
  }

  ngAfterViewInit() {
    this.observer.observe(this.bottomObserver.nativeElement);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
