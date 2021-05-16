import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/quran';
import { TabsData } from 'src/app/data/home';
import { Juz, Sajda, Surah } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.global.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private titleService: TitleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('upperSection') upperSection: ElementRef;
  @ViewChild('bottomSection') bottomSection: ElementRef;
  @ViewChild('matTabsGroup')
  matTabGroup: MatTabGroup;

  surahs = <Surah[]>Surahs;
  juzs = <Juz[]>Juzs;
  sajdas = <Sajda[]>Sajdas;
  upperSectionVisible: boolean;

  private subs = new SubSink();
  private activeRoute: string;
  private intersectionOptions = { rootMargin: '-86px 0px 0px 0px' };

  async handleTabChange(e: MatTabChangeEvent) {
    const routeToNavigate = TabsData.find((tab) => {
      return tab.textLabel.toLowerCase() == e.tab.textLabel.toLowerCase();
    });
    await this.router.navigate([routeToNavigate.path], { replaceUrl: true });
    if (!this.upperSectionVisible) {
      window.scrollTo(0, this.upperSection.nativeElement.offsetHeight - 80);
    }
  }

  observer = new IntersectionObserver((entries) => {
    this.matTabGroup.realignInkBar();
    entries.forEach((e) => {
      this.upperSectionVisible = e.isIntersecting;
    });
  }, this.intersectionOptions);

  selectCorrectTab(url: string) {
    const correctIndex = TabsData.findIndex((i) => i.path == url);

    if (this?.matTabGroup?.selectedIndex !== correctIndex) {
      this.matTabGroup.selectedIndex = correctIndex;
    }
  }

  ngOnInit() {
    this.upperSectionVisible = window.pageYOffset < 420;
    this.titleService.setTitleForHome();
    this.subs.add(
      this.route.url.subscribe((url: UrlSegment[]) => {
        this.activeRoute = url.length ? `/${url[0].path}` : '/';
      })
    );
  }

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
    this.selectCorrectTab(this.activeRoute);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
