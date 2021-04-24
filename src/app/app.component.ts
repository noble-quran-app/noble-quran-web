import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router, private theme: ThemeService) {}
  public route: string;
  private subscription: Subscription;

  ngOnInit() {
    this.theme.init();
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
