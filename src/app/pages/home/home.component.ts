import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Surahs, Juzs, Sajdas } from 'src/app/data/home';
import { Juz, Sajda, Surah } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private titleService: TitleService) {}
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

  ngOnInit() {
    this.titleService.setTitleForHome();
  }

  ngAfterViewInit() {
    this.observer.observe(this.upperSection.nativeElement);
  }
}
