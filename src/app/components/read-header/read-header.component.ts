import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'nq-read-header',
  templateUrl: './read-header.component.html',
  styleUrls: ['./read-header.component.scss'],
})
export class ReadHeaderComponent {
  constructor(private location: Location, private router: Router) {}

  @Input('menuList') menuList: any;
  @Input('currentMenuItemIndex') menuItemIndex: number;
  public menuOpen = false;

  async goBack() {
    if (history.length > 2) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
