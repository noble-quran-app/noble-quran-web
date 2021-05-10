import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, Subscription } from 'rxjs';
import { delay, retry, retryWhen, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  public isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  private onLineSubscription: Subscription;
  private offlineSubscription: Subscription;
  private intervalSubscription: Subscription;

  checkForConnectivity(retryCount: number) {
    this.http
      .get('/assets/dynamic/status.json', {
        params: {
          cache_clear: new Date().getTime().toString(),
        },
      })
      .pipe(
        retryWhen((err) =>
          err.pipe(
            delay(2000),
            scan((acc) => {
              if (acc >= retryCount) throw err;
              return acc + 1;
            }, 0)
          )
        )
      )
      .subscribe(
        () => this.isOnline.next(true),
        () => this.isOnline.next(false)
      );
  }

  initialize() {
    // First time check
    this.checkForConnectivity(0);

    this.onLineSubscription = fromEvent(window, 'offline').subscribe(() => {
      this.isOnline.next(false);
    });

    this.offlineSubscription = fromEvent(window, 'online').subscribe(() => {
      // Check when back online
      this.checkForConnectivity(3);
    });

    this.intervalSubscription = interval(10000).subscribe(() => {
      // Regular check if offline
      if (!this.isOnline.value) {
        this.checkForConnectivity(0);
      }
    });
  }

  destroy() {
    this.onLineSubscription?.unsubscribe();
    this.offlineSubscription?.unsubscribe();
    this.intervalSubscription?.unsubscribe();
  }
}
