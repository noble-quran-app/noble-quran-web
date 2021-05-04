import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { generateMenuList, getRangeForSajda } from 'src/app/core/functions';
import { AyahRange } from 'src/app/core/models';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-sajda',
  templateUrl: './sajda.component.html',
  styleUrls: ['./sajda.component.scss'],
})
export class SajdaComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private titleService: TitleService) {}

  public ayahRange: AyahRange;
  public sajdaId: number;
  private subscription: Subscription;
  public menuList = generateMenuList.forSajda();

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.sajdaId = parseInt(params.sajdaId);
      this.ayahRange = getRangeForSajda(this.sajdaId);
      this.titleService.setTitleForSajda(this.sajdaId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
