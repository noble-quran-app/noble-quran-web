import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Surahs, Juzs, Sajdas, TabsData } from 'src/app/data/home';
import { Juz, Sajda, Surah } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private titleService: TitleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('upperSection') upperSection: ElementRef;
  @ViewChild('matTabsGroup') matTabGroup: MatTabGroup;

  surahs = <Surah[]>Surahs;
  juzs = <Juz[]>Juzs;
  sajdas = <Sajda[]>Sajdas;
  upperSectionVisible = false;

  private routeSubscription: Subscription;
  private activeRoute: string;
  private intersectionOptions = { rootMargin: '-80px' };

  handleTabChange(e: MatTabChangeEvent) {
    const routeToNavigate = TabsData.find((tab) => {
      return tab.textLabel.toLowerCase() == e.tab.textLabel.toLowerCase();
    });
    this.router.navigate([routeToNavigate.path], { replaceUrl: true });
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
    this.titleService.setTitleForHome();
    this.routeSubscription = this.route.url.subscribe((url: UrlSegment[]) => {
      this.activeRoute = url.length ? `/${url[0].path}` : '/';
    });
  }

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
    this.selectCorrectTab(this.activeRoute);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
