import { Component, Input } from '@angular/core';
import { OnChanges, OnDestroy } from '@angular/core';
import { AyahRange } from 'src/app/core/models';
import { AudioService } from 'src/app/services/audio.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'nq-read-toolbar',
  templateUrl: './read-toolbar.component.html',
  styleUrls: ['./read-toolbar.component.scss'],
})
export class ReadToolbarComponent implements OnChanges, OnDestroy {
  constructor(public _audio: AudioService, public _net: NetworkService) {}

  @Input() ayahRange: AyahRange;

  ngOnChanges() {
    this._audio.destroySession();
    this._audio.startSession(this.ayahRange);
  }

  ngOnDestroy() {
    this._audio.destroySession();
  }
}
