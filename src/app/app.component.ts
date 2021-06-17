import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Scroll, Event } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter, pairwise, take } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'noble-quran-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private theme: ThemeService,
    private update: UpdateService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // this.handleScrollOnNavigation();
  }

  public splashCompleted = false;

  @HostListener('document:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  private positions: {
    [key: string]: {
      pageXOffset: number;
      pageYOffset: number;
    };
  } = {};

  private handleScrollOnNavigation(): void {
    this.router.events
      .pipe(
        // import { Event } from '@angular/router'
        filter((e: Event) => e instanceof NavigationStart || e instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((e: Event[]) => {
        if (e[0] instanceof NavigationStart) {
          const previous = e[0];
          const current = e[1];
          console.log(e);
          const { pageXOffset, pageYOffset } = window;
          this.positions[previous.url] = { pageXOffset, pageYOffset };
          // console.log({ previous, current });
        }

        if (e[1] instanceof NavigationEnd) {
          const previous = e[0];
          const current = e[1];

          if (this.positions[current.url]) {
            // console.log(this.positions[current.url]);
          }
        }
        // if (current.position) {
        //   // Backward navigation
        //   console.log(current.position);
        //   window.scrollTo(current.position[0], current.position[1]);
        //   // this.viewportScroller.scrollToPosition(current.position);
        // } else if (current.anchor) {
        //   // Anchor navigation
        //   this.viewportScroller.scrollToAnchor(current.anchor);
        // } else {
        //   // Check if routes match, or if it is only a query param change
        //   if (
        //     this.getBaseRoute(previous.routerEvent.urlAfterRedirects) !==
        //     this.getBaseRoute(current.routerEvent.urlAfterRedirects)
        //   ) {
        //     // Routes don't match, this is actual forward navigation
        //     // Default behavior: scroll to top
        //     this.viewportScroller.scrollToPosition([0, 0]);
        //   }
        // }
      });
  }

  private getBaseRoute(url: string): string {
    // return url without query params
    return url.split('?')[0];
  }

  ngOnInit() {
    this.theme.initialize();
    this.update.initialize();

    // this.router.events
    //   .pipe(
    //     filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd),
    //     pairwise()
    //   )
    //   .subscribe((navigationEvent) => {
    //     console.log(navigationEvent);
    //     if (navigationEvent instanceof NavigationStart) {
    //     } else if (navigationEvent instanceof NavigationEnd) {
    //       const { pageXOffset, pageYOffset } = window;
    //       this.positions[navigationEvent.url] = { pageXOffset, pageYOffset };
    //       // console.log(this.positions);
    //       // this.currentNavUrl = navigationEvent.url;
    //       // const storedPosition = this.scrollPositions[navigationEvent.url];
    //       // if (storedPosition && this.currentNavUrl !== navigationEvent.url) {
    //       //   console.log('got postion', storedPosition);
    //       // }
    //     }
    //   });

    fromEvent(document, 'splashcomplete')
      .pipe(take(1))
      .subscribe(() => (this.splashCompleted = true));
  }
}
