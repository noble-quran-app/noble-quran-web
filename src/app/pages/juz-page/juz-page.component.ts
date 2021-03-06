import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { generateMenuList, getRangeForJuz } from 'src/app/core/functions';
import { AyahRange } from 'src/app/core/models';
import { AudioService } from 'src/app/services/audio.service';
import { TitleService } from 'src/app/services/title.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'juz-page',
  templateUrl: './juz-page.component.html',
})
export class JuzPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private audio: AudioService
  ) {}

  private subs = new SubSink();

  public ayahRange: AyahRange;
  public juzId: number;
  public menuList = generateMenuList.forJuz();

  ngOnInit() {
    this.subs.add(
      this.route.params.subscribe((params) => {
        this.juzId = parseInt(params.juzId);
        this.ayahRange = getRangeForJuz(this.juzId);
        this.titleService.setTitleForJuz(this.juzId);
        this.audio.setMediaMetadata({
          title: `Juz ${this.juzId}`,
        });
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
