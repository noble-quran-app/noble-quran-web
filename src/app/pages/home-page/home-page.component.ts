import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { find } from 'lodash-es';
import { SubSink } from 'subsink';
import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/quran';
import { TabData } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { MatTabNav } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';
import { obsOptions, TabsData } from 'src/app/data/home';
import { ViewportScroller } from '@angular/common';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private titleService: TitleService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public viewportScroller: ViewportScroller
  ) {}

  @ViewChild('upperSection') upperSection: ElementRef<HTMLElement>;
  @ViewChild('tabNavBar') tabNavBar: MatTabNav;

  public surahs = Surahs;
  public juzs = Juzs;
  public sajdas = Sajdas;
  public tabsData = TabsData;
  public activeTab = this.tabsData[0];
  public upperSectionVisible = true;

  private subs = new SubSink();

  private observer = new IntersectionObserver(([entry]) => {
    this.upperSectionVisible = entry.isIntersecting;
    this.tabNavBar._alignInkBarToSelectedTab();
    this.cdr.detectChanges();
  }, obsOptions);

  async changeTab(e: Event, tab: TabData) {
    e.preventDefault();

    const { router, upperSection, upperSectionVisible } = this;
    const { pageXOffset, pageYOffset } = window;

    await router.navigate([tab.path], { replaceUrl: true });
    upperSectionVisible && window.scrollTo(pageXOffset, pageYOffset);
    !upperSectionVisible && window.scrollTo(0, upperSection.nativeElement.offsetHeight - 84);
  }

  backToTop() {
    this.upperSectionVisible = true;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.cdr.detectChanges();
  }

  /** Sets current tab according to URL */
  setActiveTab(url: string) {
    this.activeTab = find(this.tabsData, (tab) => tab.path === url);
  }

  ngOnInit() {
    this.upperSectionVisible = window.pageYOffset >= 0 && window.pageYOffset <= 365;
    this.cdr.detectChanges();

    this.setActiveTab(this.router.routerState.snapshot.url);
    this.cdr.detectChanges();

    this.subs.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setActiveTab(event.url);
        }
      })
    );

    this.titleService.setTitleForHome();

    fromEvent(window, 'splashcomplete')
      .pipe(take(1))
      .subscribe(() => this.tabNavBar._alignInkBarToSelectedTab());
  }

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
