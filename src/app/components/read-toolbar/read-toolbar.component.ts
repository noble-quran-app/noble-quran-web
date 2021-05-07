import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { interval, Subscription } from 'rxjs';
import { AyahRange } from 'src/app/core/models';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'nq-read-toolbar',
  templateUrl: './read-toolbar.component.html',
  styleUrls: ['./read-toolbar.component.scss'],
})
export class ReadToolbarComponent implements OnChanges, OnDestroy {
  constructor(public _audio: AudioService) {}
  @Input() ayahRange: AyahRange;

  private autoScrollSubscription: Subscription;
  private autoScrollInterval = interval(25);

  handleAutoScrollChange(e: MatSlideToggleChange) {
    if (e.checked) {
      this.autoScrollSubscription = this.autoScrollInterval.subscribe(() => window.scrollBy(0, 1));
    } else {
      this.autoScrollSubscription?.unsubscribe();
    }
  }

  ngOnChanges() {
    this._audio.destroySession();
    this._audio.startSession(this.ayahRange);
  }

  ngOnDestroy() {
    this._audio.destroySession();
    this?.autoScrollSubscription?.unsubscribe();
  }
}
