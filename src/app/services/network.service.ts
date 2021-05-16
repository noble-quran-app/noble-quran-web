import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, interval } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  private subs = new SubSink();

  public isOnline = new BehaviorSubject<boolean>(navigator.onLine);

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

    this.subs.add(
      fromEvent(window, 'offline').subscribe(() => {
        this.isOnline.next(false);
      })
    );

    this.subs.add(
      fromEvent(window, 'online').subscribe(() => {
        // Check when back online
        this.checkForConnectivity(3);
      })
    );

    this.subs.add(
      interval(10000).subscribe(() => {
        // Regular check if offline
        if (!this.isOnline.value) {
          this.checkForConnectivity(0);
        }
      })
    );
  }

  destroy() {
    this.subs.unsubscribe();
  }
}
