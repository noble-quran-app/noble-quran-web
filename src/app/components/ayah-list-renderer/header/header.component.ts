import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'read-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class ReadHeaderComponent {
  constructor(public navigator: NavigationService) {}

  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;

  public menuOpen = false;

  async navigateToHome(event: MouseEvent) {
    if (!event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      this.navigator.navigateToHome()
    }
  }
}
