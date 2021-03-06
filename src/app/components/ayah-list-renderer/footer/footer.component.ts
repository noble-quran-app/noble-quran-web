import { Component, Input, OnInit } from '@angular/core';
import { OnChanges, OnDestroy } from '@angular/core';
import { AyahRange } from 'src/app/core/models';
import { AudioService } from 'src/app/services/audio.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'read-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class ReadFooterComponent implements OnInit, OnChanges, OnDestroy {
  constructor(public _audio: AudioService, public _net: NetworkService) {}

  @Input() ayahRange: AyahRange;

  ngOnInit() {
    this._net.initialize();
  }

  ngOnChanges() {
    this._audio.destroySession();
    this._audio.startSession(this.ayahRange);
  }

  ngOnDestroy() {
    this._audio.destroySession();
  }
}
