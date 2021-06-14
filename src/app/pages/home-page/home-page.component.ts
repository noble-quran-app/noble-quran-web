import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/quran';
import { TabData } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { MatTabNav } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { obsOptions, TabsData } from 'src/app/data/home';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private titleService: TitleService, private router: Router) {}

  @ViewChild('upperSection') upperSection: ElementRef;
  @ViewChild('tabNavBar') tabNavBar: MatTabNav;

  public surahs = Surahs;
  public juzs = Juzs;
  public sajdas = Sajdas;
  public tabsData = TabsData;
  public activeTab = this.tabsData[0];
  public upperSectionVisible: boolean;

  private subs = new SubSink();
  private observer = new IntersectionObserver(([entry]) => {
    this.upperSectionVisible = entry.isIntersecting;
    this.tabNavBar._alignInkBarToSelectedTab();
  }, obsOptions);

  backToTop() {
    window.scrollTo(0, 0);
  }

  async changeTab(e: Event, tab: TabData) {
    e.preventDefault();

    const { router, upperSection, upperSectionVisible } = this;
    const { pageXOffset, pageYOffset } = window;

    await router.navigate([tab.path], { replaceUrl: true });
    upperSectionVisible && window.scrollTo(pageXOffset, pageYOffset);
    !upperSectionVisible && window.scrollTo(0, upperSection.nativeElement.offsetHeight - 84);
  }

  ngOnInit() {
    this.titleService.setTitleForHome();
    this.upperSectionVisible = window.pageYOffset < 420;

    // Setting current tab according to url path
    this.activeTab = this.tabsData.find((s) => s.path === this.router.routerState.snapshot.url);

    // Setting current tab according to url path on route change
    this.subs.add(
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.activeTab = this.tabsData.find((section) => section.path === evt.url);
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
