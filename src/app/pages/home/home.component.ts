import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/home';
import { Juz, Sajda, Surah } from 'src/app/data/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  constructor() {}
  @ViewChild('upperSection') upperSection: ElementRef;

  surahs = <Surah[]>Surahs;
  juzs = <Juz[]>Juzs;
  sajdas = <Sajda[]>Sajdas;
  upperSectionVisible = true;

  observer = new IntersectionObserver(
    (entries) => {
      if ('dispatchEvent' in window) {
        window.dispatchEvent(new Event('resize'));
      }
      entries.forEach((e) => {
        this.upperSectionVisible = e.isIntersecting;
      });
    },
    { rootMargin: '-80px' }
  );

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
