import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { fromEvent, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'noble-quran-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private update: UpdateService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  public splashCompleted = false;
  private scrollSubscription: Subscription;

  @HostListener('document:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.theme.initialize();
    this.update.initialize();

    this.router.events.subscribe((e) => {
      if (e instanceof Scroll) {
        this.restoreScrollPosition(e.position);
      }
    });

    fromEvent(document, 'splashcomplete')
      .pipe(take(1))
      .subscribe(() => (this.splashCompleted = true));
  }

  restoreScrollPosition(position: [number, number]) {
    if (position && position.length) {
      this.scrollSubscription = interval(1)
        .pipe(take(3000))
        .subscribe(() => {
          if (window.pageXOffset !== position[0] || window.pageYOffset !== position[1]) {
            this.viewportScroller.scrollToPosition(position);
          } else if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
          }
        });
    }
  }
}
