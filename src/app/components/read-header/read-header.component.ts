import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'read-header',
  templateUrl: './read-header.component.html',
  styleUrls: ['./read-header.component.scss'],
})
export class ReadHeaderComponent implements OnInit {
  constructor() {}

  @Input('menuList') menuList;
  @Input('currentMenuItemIndex') menuItemIndex;
  public headerElevated = false;
  public menuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.headerElevated = true;
    } else if (
      (this.headerElevated && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.headerElevated = false;
    }
  }

  ngOnInit(): void {}
}
