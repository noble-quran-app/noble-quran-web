import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { delay, switchMap, tap, throttleTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { getAyahAudioUrl } from '../core/functions';
import { asyncTimer } from '../core/utils';
import { AyahRange, MediaSessionOptions } from '../core/models';
import { NetworkService } from './network.service';
import { random } from 'lodash-es';

export const randomQuranImage = (idx?: number): MediaImage => {
  idx = idx ?? random(1, 5, false);

  const mediaImage: MediaImage = {
    src: `/assets/images/quran-cover-${idx}.jpg`,
    type: 'image/jpg',
  };

  return mediaImage;
};

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private _net: NetworkService) {}

  private ayahRange: AyahRange = null;
  private audioRef: HTMLAudioElement = null;
  private cachedAudioRef: HTMLAudioElement = null;
  private isBufferingSource = new BehaviorSubject<boolean>(false);
  private reloadSource: Subject<null> = null;
  private sessionExists: boolean = false;
  private subs = new SubSink();
  private idSubscription: Subscription;

  public isPlaying = new BehaviorSubject<boolean>(false);
  public isCompleted = new BehaviorSubject<boolean>(false);
  public playbackError = new BehaviorSubject<string>(null);
  public currentAyahId = new BehaviorSubject<number>(-1);

  public isBuffering = this.isBufferingSource
    .asObservable()
    .pipe(switchMap((val) => of(val).pipe(delay(val ? 800 : 200))));

  private cacheAudioInMemory(audioUrl: string) {
    if (this.sessionExists) {
      this.cachedAudioRef.src = audioUrl;
    }
  }

  private setAudioSrc(ayahId: number) {
    this.isCompleted.next(false);
    if (this.audioRef && ayahId >= 1 && ayahId <= 6236) {
      this.audioRef.autoplay = this.isPlaying.value;
      this.audioRef.src = getAyahAudioUrl(ayahId);
    }
  }

  public skipToNextAyah() {
    if (!this.isLastAyah(this.currentAyahId.value) && this.sessionExists) {
      const nextAyahId = this.currentAyahId.value + 1;
      this.currentAyahId.next(nextAyahId);
    }
  }

  public skipToPreviousAyah() {
    if (!this.isFirstAyah(this.currentAyahId.value) && this.sessionExists) {
      const prevAyahId = this.currentAyahId.value - 1;
      this.currentAyahId.next(prevAyahId);
    }
  }

  private isFirstAyah(ayahId: number) {
    return ayahId === this.ayahRange.start;
  }

  private isLastAyah(ayahId: number) {
    return ayahId === this.ayahRange.end;
  }

  private async reloadCurrentAyah(timeout = 3000) {
    try {
      await asyncTimer(timeout);
      this.setAudioSrc(this.currentAyahId.value);
      if (this.isPlaying.value) {
        this.play();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  private cacheNextAudio() {
    if (this.currentAyahId.value !== this.ayahRange.end) {
      const nextAyahId = this.currentAyahId.value + 1;
      this.cacheAudioInMemory(getAyahAudioUrl(nextAyahId));
    }
  }

  public pause() {
    if (this.sessionExists) {
      this.isPlaying.next(false);
      this.audioRef.pause();
    }
  }

  public async play() {
    if (this.sessionExists) {
      // id subscription for audio src
      if (!this.idSubscription) {
        this.idSubscription = this.currentAyahId
          .pipe(
            tap(() => {
              this.audioRef && !this.audioRef.paused && this.audioRef.pause();
              this.isBufferingSource.next(true);
            }),
            throttleTime(1800, asyncScheduler, { leading: true, trailing: true })
          )
          .subscribe((id) => this.setAudioSrc(id));
      }

      this.isPlaying.next(true);
      try {
        await this.audioRef.play();
        this.playbackError.next(null);
      } catch (error) {
        this.playbackError.next(error.message);
        this.reloadSource.next(null);
      }
    }
  }

  public playPause() {
    if (!this.isPlaying.value && this.audioRef.paused && this.sessionExists) {
      this.play();
      return;
    }
    this.pause();
  }

  public replaySession() {
    if (this.sessionExists) {
      this.isCompleted.next(false);
      this.currentAyahId.next(this.ayahRange.start);
      this.setAudioSrc(this.ayahRange.start);
      this.play();
    }
  }

  public relativeSeek(difference: number) {
    this.audioRef.currentTime += difference;
  }

  public absoluteSeek(time: number) {
    this.audioRef.currentTime = time;
  }

  public startSession(ayahRange: AyahRange) {
    this.audioRef = new Audio();
    this.cachedAudioRef = new Audio();
    this.audioRef.preload = 'auto';
    this.cachedAudioRef.muted = true;
    this.reloadSource = new Subject<null>();
    this.idSubscription = null;

    /** for debugging */
    // console.log(this.audioRef)

    this.audioRef.onloadstart = () => this.isBufferingSource.next(true);
    this.audioRef.onwaiting = () => this.isBufferingSource.next(true);
    this.audioRef.oncanplaythrough = () => {
      this.isBufferingSource.next(false);
      this.cacheNextAudio();
    };

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
      if (this.isLastAyah(this.currentAyahId.value)) {
        this.isCompleted.next(true);
        this.isPlaying.next(false);
        return null;
      }
      this.skipToNextAyah();
    };

    // Handling errors while caching next audio
    this.cachedAudioRef.onerror = () => this.cacheNextAudio();

    // Reloading with throttleTime to ensure audio doesn't reload between short intervals.
    this.reloadSource
      .pipe(throttleTime(3400))
      .subscribe(() => this.isPlaying.value && this.reloadCurrentAyah(3500));

    this.subs.add(
      this._net.isOnline.subscribe((isOnline) => {
        if (isOnline && this.isBufferingSource.value) {
          this.reloadSource.next(null);
        }
      })
    );

    this.sessionExists = true;
  }

  public destroySession() {
    this.sessionExists = false;

    // First pause any playing audio
    this.audioRef?.pause();

    // Then destroy it
    this.audioRef = null;
    this.cachedAudioRef = null;
    this.reloadSource?.complete();
    this.currentAyahId?.next(-1);
    this.isCompleted?.next(false);
    this.isPlaying?.next(false);
    this.isBufferingSource?.next(false);

    this.idSubscription?.unsubscribe();
    this.subs.unsubscribe();
  }

  /** set metadata for media session */
  public setMediaMetadata(options: MediaSessionOptions) {
    if (navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('seekbackward', () => this.relativeSeek(-5));
      navigator.mediaSession.setActionHandler('seekforward', () => this.relativeSeek(+5));
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('stop', () => this.pause());

      // Clearing any previous metadata before setting new one
      navigator.mediaSession.metadata = null;

      const newMetaData = new MediaMetadata({
        title: options.title ?? 'Noble Quran',
        artwork: options.artwork ?? [randomQuranImage()],
        artist: options.artist ?? 'Mishary bin Rashid Alafasy',
      });

      navigator.mediaSession.metadata = newMetaData;
    }
  }
}
