import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}
  public route: string;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        this.route = e.url;
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
