import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdbService } from 'src/app/services/idb.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'ayah-renderer',
  templateUrl: './ayah-renderer.component.html',
  styleUrls: ['./ayah-renderer.component.scss'],
})
export class AyahRendererComponent implements OnInit {
  constructor(private idb: IdbService, public settings: SettingService) {}

  @Input('ayahId') ayahId: number;
  @Input('ayahIndex') ayahIndex: number;
  @Output('onStateChange') stateChange = new EventEmitter();
  public ayah: any;

  async ngOnInit() {
    try {
      this.ayah = await this.idb.getAyahWithEditons(this.ayahId, [
        'quran.simple',
        'en.sahih',
      ]);

      this.stateChange.emit([this.ayahIndex]);
    } catch (error) {
      this.stateChange.emit([this.ayahIndex, error.message]);
    }
  }
}
