import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { delay, retry, retryWhen, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  public isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  private onLineSubscription: Subscription;
  private offlineSubscription: Subscription;

  checkForConnectivity() {
    this.http
      .get('/assets/dynamic/status.json')
      .pipe(
        retryWhen((err) =>
          err.pipe(
            delay(2000),
            scan((acc) => {
              if (acc >= 3) throw err;
              return acc + 1;
            }, 0)
          )
        )
      )
      .subscribe(() => this.isOnline.next(true));
  }

  init() {
    this.onLineSubscription = fromEvent(window, 'offline').subscribe(() =>
      this.isOnline.next(false)
    );
    this.offlineSubscription = fromEvent(window, 'online').subscribe(() =>
      this.checkForConnectivity()
    );
  }

  destroy() {
    this.onLineSubscription?.unsubscribe();
    this.offlineSubscription?.unsubscribe();
  }
}
