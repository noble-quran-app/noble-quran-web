import { Injectable } from '@angular/core';
import { ScrollPosition } from '../core/models';
import { asyncTimer, isStandalone } from '../core';
import { Router, Scroll, Event } from '@angular/router';
import { ViewportScroller, Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private framesTracker: number;

  constructor(
    private router: Router,
    private location: Location,
    private viewportScroller: ViewportScroller
  ) {}

  async restoreScroll(position: ScrollPosition) {
    if (window.pageYOffset !== position[1]) {
      window.cancelAnimationFrame(this.framesTracker);
      this.viewportScroller.scrollToPosition(position);
    }
  }

  async cancelAnimationFrames(tracker: number, wait: number) {
    await asyncTimer(wait);
    window.cancelAnimationFrame(tracker);
  }

  navigateToHome() {
    if (this.router.navigated) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  initialize() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof Scroll && event.position?.length) {
        const animation = () => this.restoreScroll(event.position);

        this.framesTracker = window.requestAnimationFrame(animation);
        this.cancelAnimationFrames(this.framesTracker, 1500);
      }
    });
  }
}
