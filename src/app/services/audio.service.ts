import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { getAyahAudioUrl, Timer } from '../core/functions';
import { AyahRange } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioRef: HTMLAudioElement;
  private cachedAudioRef: HTMLAudioElement;
  private isBufferingSource = new BehaviorSubject<boolean>(false);

  public isPlaying = new BehaviorSubject<boolean>(false);
  public isCompleted = new BehaviorSubject<boolean>(false);
  public playbackError = new BehaviorSubject<string>('');
  public currentAyahId = new BehaviorSubject<number>(null);
  public ayahRange: AyahRange;

  public isBuffering = this.isBufferingSource.asObservable().pipe(
    switchMap((buffering) => {
      if (buffering) {
        return of(true).pipe(delay(800));
      }
      return of(false).pipe(delay(500));
    })
  );

  cacheAyah(ayahURL: string) {
    this.cachedAudioRef.pause();
    this.cachedAudioRef.src = ayahURL;
  }

  setAudioSrc(ayahId: number) {
    this.isCompleted.next(false);
    this.audioRef.src = getAyahAudioUrl(ayahId);
    this.cacheAyah(getAyahAudioUrl(ayahId + 1));
  }

  skipToNextAyah() {
    if (this.currentAyahId.value !== this.ayahRange.end) {
      const nextAyahId = this.currentAyahId.value + 1;
      this.currentAyahId.next(nextAyahId);
      this.setAudioSrc(nextAyahId);
    }
    this.play();
  }

  skipToPreviousAyah() {
    if (this.currentAyahId.value !== this.ayahRange.start) {
      const prevAyahId = this.currentAyahId.value - 1;
      this.currentAyahId.next(prevAyahId);
      this.setAudioSrc(prevAyahId);
    }
    this.play();
  }

  isLastAyah(ayahId: number) {
    return ayahId === this.ayahRange.end;
  }

  pause() {
    this.audioRef.pause();
    this.isPlaying.next(false);
  }

  async play() {
    try {
      await this.audioRef.play();
      this.isPlaying.next(true);
    } catch (error) {
      this.playbackError.next(error.message);
      await Timer(5000);
      this.setAudioSrc(this.currentAyahId.value);
      this.play();
    }
  }

  playPause() {
    if (this.audioRef.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  async replaySession() {
    this.isCompleted.next(false);
    this.currentAyahId.next(this.ayahRange.start);
    this.setAudioSrc(this.ayahRange.start);
    await this.play();
  }

  startSession(ayahRange: AyahRange) {
    this.audioRef = new Audio();
    this.cachedAudioRef = new Audio();

    this.ayahRange = ayahRange;
    this.currentAyahId.next(ayahRange.start);
    this.setAudioSrc(ayahRange.start);

    this.audioRef.onplay = () => {
      this.isPlaying.next(true);
      this.isBufferingSource.next(false);
    };

    this.audioRef.onpause = async () => {
      this.isBufferingSource.next(false);
      await Timer(200);
      if (this.audioRef.paused) {
        this.isPlaying.next(false);
      }
    };

    this.audioRef.onwaiting = () => this.isBufferingSource.next(true);
    this.audioRef.onloadedmetadata = () => this.isBufferingSource.next(false);
    this.audioRef.onload = () => this.isBufferingSource.next(false);

    this.audioRef.onended = () => {
      if (this.isLastAyah(this.currentAyahId.value)) {
        this.isCompleted.next(true);
        return false;
      }
      this.skipToNextAyah();
    };
  }

  destroySession() {
    this.audioRef?.pause();
    this.audioRef = null;
    this.cachedAudioRef = null;
  }
}
