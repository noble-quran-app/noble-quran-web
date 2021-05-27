import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { generateMenuList, getRangeForSajda } from 'src/app/core/functions';
import { AyahRange } from 'src/app/core/models';
import { AudioService } from 'src/app/services/audio.service';
import { TitleService } from 'src/app/services/title.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sajda',
  templateUrl: './sajda.component.html',
  styleUrls: ['./sajda.component.scss'],
})
export class SajdaComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private audio: AudioService
  ) {}

  private subs = new SubSink();

  public ayahRange: AyahRange;
  public sajdaId: number;
  public menuList = generateMenuList.forSajda();

  ngOnInit() {
    this.subs.add(
      this.route.params.subscribe((params) => {
        this.sajdaId = parseInt(params.sajdaId);
        this.ayahRange = getRangeForSajda(this.sajdaId);
        this.titleService.setTitleForSajda(this.sajdaId);
        this.audio.setMediaMetadata({
          title: `Sajda ${this.sajdaId}`,
        });
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
