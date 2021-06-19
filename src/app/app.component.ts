import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, Scroll, Event } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ScrollPosition } from './core/models';
import { ThemeService } from './services/theme.service';
import { UpdateService } from './services/update.service';

const staticRoutes = ['/', '/juz', '/sajda'];

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
  private framesTracker: number;

  @HostListener('document:keydown.control.x', ['$event'])
  toggleTheme(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.theme.initialize();
    this.update.initialize();

    this.router.events
      .pipe(filter((event: Event): event is Scroll => event instanceof Scroll))
      .subscribe(({ routerEvent, position }) => {
        if (position?.length && staticRoutes.includes(routerEvent.url)) {
          this.framesTracker = window.requestAnimationFrame(() => {
            this.restoreScroll(position);
          });
        }
      });

    fromEvent(document, 'splash')
      .pipe(take(1))
      .subscribe(() => {
        this.splashCompleted = true;
      });
  }

  restoreScroll(position: ScrollPosition) {
    if (window.pageYOffset !== position[1]) {
      window.cancelAnimationFrame(this.framesTracker);
      this.viewportScroller.scrollToPosition(position);
    }
  }
}
