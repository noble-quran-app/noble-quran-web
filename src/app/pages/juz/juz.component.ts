import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { generateMenuList, getRangeForJuz } from 'src/app/core/functions';
import { AyahRange } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'juz-page',
  templateUrl: './juz.component.html',
  styleUrls: ['./juz.component.scss'],
})
export class JuzComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private titleService: TitleService) {}

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
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
