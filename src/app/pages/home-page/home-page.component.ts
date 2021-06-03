import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/quran';
import { Juz, Sajda, Surah } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { MatTabNav } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private titleService: TitleService, private router: Router) {}

  @ViewChild('upperSection') upperSection: ElementRef;
  @ViewChild('tabNavBar') NavBar: MatTabNav;

  public surahs = <Surah[]>Surahs;
  public juzs = <Juz[]>Juzs;
  public sajdas = <Sajda[]>Sajdas;
  public upperSectionVisible: boolean;
  public sections = [
    { path: '/', label: 'Surah' },
    { path: '/juz', label: 'Juz' },
    { path: '/sajda', label: 'Sajda' },
  ];
  public activeSection = this.sections[0];

  private subs = new SubSink();
  private intersectionOptions = { rootMargin: '-86px 0px 0px 0px' };

  private observer = new IntersectionObserver(([entry]) => {
    this.upperSectionVisible = entry.isIntersecting;
    this.NavBar._alignInkBarToSelectedTab();
  }, this.intersectionOptions);

  backToTop() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.titleService.setTitleForHome();
    this.upperSectionVisible = window.pageYOffset < 420;
    this.activeSection = this.sections.find((s) => s.path === this.router.routerState.snapshot.url);
    this.subs.add(
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.activeSection = this.sections.find((section) => section.path === evt.url);
        }
      })
    );
  }

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
