import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'page-not-found',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss'],
})
export class DefaultPage {
  constructor(title: TitleService) {
    title.setTitleForPageNotFound();
  }
}
