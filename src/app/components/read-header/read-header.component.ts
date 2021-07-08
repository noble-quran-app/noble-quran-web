import { Component, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'read-header',
  templateUrl: './read-header.component.html',
  styleUrls: ['./read-header.component.scss'],
})
export class ReadHeaderComponent implements OnDestroy {
  constructor(public navigator: NavigationService) {}

  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;

  private fadeSubscription: Subscription;

  public menuOpen = false;
  public faded = new BehaviorSubject(false);

  async navigateToHome(event: MouseEvent) {
    if (!event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      timer(100).subscribe(() => this.navigator.navigateToHome());
    }

    if (!this.faded.value) {
      this.faded.next(true);
      this.fadeSubscription = timer(150).subscribe(() => this.faded.next(false));
    }
  }

  ngOnDestroy() {
    this.fadeSubscription?.unsubscribe();
  }
}
