import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { delay, switchMap, throttleTime } from 'rxjs/operators';
import { getAyahAudioUrl, Timer } from '../core/functions';
import { AyahRange } from '../core/models';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private _net: NetworkService) {}

  private ayahRange: AyahRange;
  private audioRef: HTMLAudioElement = new Audio();
  private cachedAudioRef: HTMLAudioElement;
  private isBufferingSource = new BehaviorSubject<boolean>(false);
  private reloadSource: Subject<null> = null;
  private netSubscription: Subscription;

  public isPlaying = new BehaviorSubject<boolean>(false);
  public isCompleted = new BehaviorSubject<boolean>(false);
  public playbackError = new BehaviorSubject<string>(null);
  public currentAyahId = new BehaviorSubject<number>(-1);

  public isBuffering = this.isBufferingSource
    .asObservable()
    .pipe(switchMap((val) => of(val).pipe(delay(val ? 800 : 200))));

  cacheAudioInMemory(resourceUrl: string) {
    this.cachedAudioRef.pause();
    this.cachedAudioRef.src = resourceUrl;
  }

  setAudioSrc(ayahId: number, cacheNextAudio: boolean) {
    this.isCompleted.next(false);
    if (this.audioRef && ayahId >= 1 && ayahId <= 6236) {
      this.audioRef.src = getAyahAudioUrl(ayahId);

      if (cacheNextAudio && this.currentAyahId.value !== this.ayahRange.end) {
        this.cacheAudioInMemory(getAyahAudioUrl(ayahId + 1));
      }
    }
  }

  skipToNextAyah() {
    if (!this.isLastAyah(this.currentAyahId.value)) {
      const nextAyahId = this.currentAyahId.value + 1;
      this.currentAyahId.next(nextAyahId);
    }
  }

  skipToPreviousAyah() {
    if (!this.isFirstAyah(this.currentAyahId.value)) {
      const prevAyahId = this.currentAyahId.value - 1;
      this.currentAyahId.next(prevAyahId);
    }
  }

  isFirstAyah(ayahId: number) {
    return ayahId === this.ayahRange.start;
  }

  isLastAyah(ayahId: number) {
    return ayahId === this.ayahRange.end;
  }

  pause() {
    this.isPlaying.next(false);
    this.audioRef.pause();
  }

  async play() {
    this.isPlaying.next(true);
    try {
      await this.audioRef.play();
      this.playbackError.next(null);
    } catch (error) {
      this.playbackError.next(error.message);
      this.reloadSource.next(null);
    }
  }

  playPause() {
    if (!this.isPlaying.value && this.audioRef.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  replaySession() {
    this.isCompleted.next(false);
    this.currentAyahId.next(this.ayahRange.start);
    this.setAudioSrc(this.ayahRange.start, false);
    this.play();
  }

  async reloadCurrentAyah(timeout = 3000) {
    try {
      await Timer(timeout);
      this.setAudioSrc(this.currentAyahId.value, false);
      if (this.isPlaying.value) {
        this.play();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  startSession(ayahRange: AyahRange) {
    this.audioRef = new Audio();
    this.cachedAudioRef = new Audio();
    this.audioRef.preload = 'auto';
    this.reloadSource = new Subject<null>();

    this.audioRef.onloadstart = () => this.isBufferingSource.next(true);
    this.audioRef.onwaiting = () => this.isBufferingSource.next(true);
    this.audioRef.oncanplaythrough = () => this.isBufferingSource.next(false);

    this.ayahRange = ayahRange;
    this.currentAyahId.next(ayahRange.start);

    this.audioRef.onplay = () => {
      this.isPlaying.next(true);
      this.isBufferingSource.next(false);
      this.playbackError.next(null);
    };

    this.audioRef.onerror = () => {
      this.isBufferingSource.next(true);
      if (this.isPlaying.value) {
        this.reloadSource.next(null);
      }
    };

    this.audioRef.onended = () => {
      const wasLast = this.isLastAyah(this.currentAyahId.value);
      this.isCompleted.next(wasLast);
      wasLast && this.isPlaying.next(false);
      this.skipToNextAyah();
    };

    // Reloading with throttleTime to ensure audio doesn't reload between short intervals.
    this.reloadSource
      .asObservable()
      .pipe(throttleTime(3400))
      .subscribe(() => this.isPlaying.value && this.reloadCurrentAyah(3500));

    this.currentAyahId.asObservable().subscribe((id) => {
      this.setAudioSrc(id, true);
      this.audioRef && (this.audioRef.autoplay = this.isPlaying.value);
    });

    this.netSubscription = this._net.isOnline.subscribe((isOnline) => {
      if (isOnline && this.isBufferingSource.value) {
        this.reloadSource.next(null);
      }
    });
  }

  destroySession() {
    this.reloadSource?.complete();
    this.currentAyahId.next(-1);
    this.isCompleted.next(false);
    this.isPlaying.next(false);
    this.isBufferingSource.next(false);

    this.audioRef?.pause();
    this.audioRef = null;
    this.cachedAudioRef = null;

    this.netSubscription?.unsubscribe();
  }
}
