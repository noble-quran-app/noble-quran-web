import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScrollPosition } from './core/models';
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
  private framesTracker: number;

  @HostListener('document:keydown.control.x', ['$event'])
  toggleTheme(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.theme.initialize();
    this.update.initialize();

    this.router.events.subscribe((event) => {
      if (event instanceof Scroll && event?.position?.length) {
        this.framesTracker = window.requestAnimationFrame(() => {
          this.restoreScroll(event.position);
        });
      }
    });

    fromEvent(document, 'splashcomplete')
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
