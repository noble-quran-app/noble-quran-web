import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { generateMenuList, getRangeForJuz } from 'src/app/core/functions';
import { AyahRange } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-juz',
  templateUrl: './juz.component.html',
  styleUrls: ['./juz.component.scss'],
})
export class JuzComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {}

  public range: AyahRange;
  public juzId: number;
  private subscription: Subscription;
  public menuList = generateMenuList.forJuz();

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.juzId = parseInt(params.juzId);
      this.range = getRangeForJuz(this.juzId);
      this.titleService.setTitleForJuz(this.juzId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
