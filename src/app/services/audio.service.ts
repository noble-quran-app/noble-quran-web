import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, of, Subject } from 'rxjs';
import { delay, switchMap, tap, throttleTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { getAyahAudioUrl, Timer } from '../core/functions';
import { AyahRange } from '../core/models';
import { NetworkService } from './network.service';
import { random } from 'lodash-es';

export const QuranCover = (idx?: number): MediaImage => {
  idx = idx ?? random(1, 5, false);

  return {
    src: `/assets/static/images/quran/${idx}.jpg`,
    type: 'image/jpg',
  };
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
      await Timer(timeout);
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
    if (this.sessionExists) {
      if (!this.isPlaying.value && this.audioRef.paused && this.sessionExists) {
        this.play();
      } else {
        this.pause();
      }
    }
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
    this.audioRef.currentTime = this.audioRef.currentTime + difference;
  }

  public absoluteSeek(time: number) {
    this.audioRef.currentTime = time;
  }

  public seekForward = () => this.relativeSeek(+5);
  public seekBackward = () => this.relativeSeek(-5);

  public startSession(ayahRange: AyahRange) {
    this.audioRef = new Audio();
    this.cachedAudioRef = new Audio();
    this.audioRef.preload = 'auto';
    this.cachedAudioRef.muted = true;
    this.reloadSource = new Subject<null>();

    this.audioRef.volume = 0.01;

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
      const wasLast = this.isLastAyah(this.currentAyahId.value);
      this.isCompleted.next(wasLast);
      wasLast && this.isPlaying.next(false);
      this.skipToNextAyah();
    };

    this.audioRef.onpause = () => this.isPlaying.next(false);

    // Handling errors while caching next audio
    this.cachedAudioRef.onerror = () => this.cacheNextAudio();

    // Reloading with throttleTime to ensure audio doesn't reload between short intervals.
    this.reloadSource
      .asObservable()
      .pipe(throttleTime(3400))
      .subscribe(() => this.isPlaying.value && this.reloadCurrentAyah(3500));

    this.currentAyahId
      .asObservable()
      .pipe(
        tap(() => {
          this.audioRef && !this.audioRef.paused && this.audioRef.pause();
          this.isBufferingSource.next(true);
        }),
        throttleTime(1800, asyncScheduler, {
          leading: true,
          trailing: true,
        })
      )
      .subscribe((id) => {
        this.setAudioSrc(id);
        this.audioRef && (this.audioRef.autoplay = this.isPlaying.value);
      });

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
    this.audioRef?.pause();
    this.audioRef = null;
    this.cachedAudioRef = null;

    this.reloadSource?.complete();
    this.currentAyahId.next(-1);
    this.isCompleted.next(false);
    this.isPlaying.next(false);
    this.isBufferingSource.next(false);

    this.subs.unsubscribe();

    // Clearing current media session
    navigator.mediaSession && (navigator.mediaSession.playbackState = 'none');
  }

  /** set metadata for media session */
  public setMediaMetadata(options: MediaSessionOptions) {
    if (navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('seekforward', this.seekForward);
      navigator.mediaSession.setActionHandler('seekbackward', this.seekBackward);

      // navigator.mediaSession.setActionHandler('pause', this.pause);
      // navigator.mediaSession.setActionHandler('play', this.play);
      // navigator.mediaSession.setActionHandler('stop', this.destroySession);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: options.title,
        artwork: options.artwork ?? [QuranCover()],
        artist: options.artist ?? 'Mishary bin Rashid Alafasy',
      });
    }
  }
}

interface MediaSessionOptions {
  title: string;
  artwork?: MediaImage[];
  artist?: string;
  album?: string;
}
