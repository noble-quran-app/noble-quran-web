import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'read-header',
  templateUrl: './read-header.component.html',
  styleUrls: ['./read-header.component.scss'],
})
export class ReadHeaderComponent {
  constructor(public navigator: NavigationService) {}

  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;
  public menuOpen = false;
}
