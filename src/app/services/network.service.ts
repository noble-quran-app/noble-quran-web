import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { SubSink } from 'subsink';
import { retryTimes, storageURL } from '../utils';

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
    const next = () => {
      this.isOnline.next(true);
      this.isChecking.next(false);
    };

    const error = () => {
      this.isOnline.next(false);
      this.isChecking.next(false);
    };

    const complete = () => {
      this.isChecking.next(false);
    };

    if (!this.isChecking.value) {
      this.isChecking.next(true);
      this.http
        .get(storageURL(`status.json?cache_burst=${Date.now()}`))
        .pipe(retryTimes(retryCount, 2000))
        .subscribe({ next, error, complete });
    }
  }

  initialize() {
    if (this.isInitialized) return;

    // First time check
    this.isInitialized = true;
    this.checkForConnectivity(0);

    this.subs.add(fromEvent(window, 'offline').subscribe(() => this.isOnline.next(false)));
    this.subs.add(fromEvent(window, 'online').subscribe(() => this.checkForConnectivity(5)));
  }

  dispose() {
    this.subs.unsubscribe();
  }
}
