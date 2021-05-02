import { ActivatedRoute } from '@angular/router';
import { generateMenuList, getRangeForSurah } from 'src/app/core/functions';
import { Surahs } from '../../data/home';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AyahRange } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'surah-page',
  templateUrl: './surah.component.html',
})
export class SurahComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private titleService: TitleService) {}

  public surahs = Surahs;
  public surahId: number;
  public range: AyahRange;
  private subscription: Subscription;
  public menuList = generateMenuList.forSurah();

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.surahId = parseInt(params.surahId);
      this.range = getRangeForSurah(this.surahId);
      this.titleService.setTitleForSurah(this.surahId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
