import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'read-header',
  templateUrl: './read-header.component.html',
  styleUrls: ['./read-header.component.scss'],
})
export class ReadHeaderComponent {
  constructor(private location: Location, private router: Router) {}

  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;
  public menuOpen = false;

  async goBack() {
    if (history.length > 2) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
