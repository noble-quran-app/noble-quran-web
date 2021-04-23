import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/home';
import { Juz, Sajda, Surah } from 'src/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('upperSection') upperSection: ElementRef;
  @Input('route') route: string;

  surahs = <Surah[]>Surahs;
  juzs = <Juz[]>Juzs;
  sajdas = <Sajda[]>Sajdas;
  upperSectionVisible = true;
  intersectionOptions = { rootMargin: '-80px' };

  observer = new IntersectionObserver((entries) => {
    if (window.dispatchEvent) {
      window.dispatchEvent(new Event('resize'));
    }
    entries.forEach((e) => (this.upperSectionVisible = e.isIntersecting));
  }, this.intersectionOptions);

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
  }
}
