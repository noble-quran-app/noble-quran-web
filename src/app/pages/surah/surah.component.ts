import { ActivatedRoute } from '@angular/router';
import { generateMenuList, getRangeForSurah } from 'src/app/core/functions';
import { Surahs } from '../../data/quran';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AyahRange } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { SubSink } from 'subsink';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'surah-page',
  templateUrl: './surah.component.html',
})
export class SurahComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private audio: AudioService
  ) {}

  private subs = new SubSink();

  public surahs = Surahs;
  public surahId: number;
  public ayahRange: AyahRange;
  public menuList = generateMenuList.forSurah();

  ngOnInit() {
    this.subs.add(
      this.route.params.subscribe((params) => {
        this.surahId = parseInt(params.surahId);
        this.ayahRange = getRangeForSurah(this.surahId);
        this.titleService.setTitleForSurah(this.surahId);
      })
    );

    this.audio.setMediaMetadata({
      title: `Surah ${this.surahs[this.surahId - 1].englishName}`,
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
