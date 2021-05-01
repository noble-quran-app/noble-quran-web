import { Component, HostListener, Input } from '@angular/core';
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
  public headerElevated = false;
  public menuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.headerElevated = Boolean(window.pageYOffset);
  }

  async goBack() {
    if (history.length > 2) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
