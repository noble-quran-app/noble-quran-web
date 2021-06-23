import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { getFromStorage } from '../core/utils';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  private subs = new SubSink();
  private isChecking = new BehaviorSubject<boolean>(false);
  private isInitialized = false;

  public isOnline = new BehaviorSubject<boolean>(navigator.onLine);

  checkForConnectivity(retryCount: number) {
    if (!this.isChecking.value) {
      this.isChecking.next(true);
      this.http
        .get(getFromStorage('status.json'), {
          params: {
            cache_burst: new Date().getTime().toString(),
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
          () => {
            this.isOnline.next(true);
            this.isChecking.next(false);
          },
          () => {
            this.isOnline.next(false);
            this.isChecking.next(false);
          },
          () => {
            this.isChecking.next(false);
          }
        );
    }
  }

  initialize() {
    if (this.isInitialized) {
      return false;
    }

    // First time check
    this.isInitialized = true;
    this.checkForConnectivity(0);

    this.subs.add(fromEvent(window, 'offline').subscribe(() => this.isOnline.next(false)));

    this.subs.add(fromEvent(window, 'online').subscribe(() => this.checkForConnectivity(10)));
  }

  destroy() {
    this.subs.unsubscribe();
  }
}
