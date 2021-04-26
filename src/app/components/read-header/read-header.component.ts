import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'read-header',
  templateUrl: './read-header.component.html',
  styleUrls: ['./read-header.component.scss'],
})
export class ReadHeaderComponent implements OnInit {
  constructor(public location: Location) {}

  @Input('menuList') menuList: any;
  @Input('currentMenuItemIndex') menuItemIndex: number;
  @ViewChild(MatMenuTrigger) navMenuTrigger: MatMenuTrigger;
  public headerElevated = false;
  public menuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.headerElevated = Boolean(window.pageYOffset);

    if (this.navMenuTrigger.menuOpen) {
      this.navMenuTrigger.closeMenu();
    }
  }

  ngOnInit(): void {}
}
