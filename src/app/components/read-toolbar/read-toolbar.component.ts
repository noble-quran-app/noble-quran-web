import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { AyahRange } from 'src/app/core/models';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'nq-read-toolbar',
  templateUrl: './read-toolbar.component.html',
  styleUrls: ['./read-toolbar.component.scss'],
})
export class ReadToolbarComponent implements OnChanges, OnDestroy {
  @Input() ayahRange: AyahRange;
  constructor(public _audio: AudioService) {}

  ngOnChanges() {
    this._audio.destroySession();
    this._audio.startSession(this.ayahRange);
  }

  ngOnDestroy() {
    this._audio.destroySession();
  }
}
