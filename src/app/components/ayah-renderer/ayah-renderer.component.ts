import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AyahReadyStateChange } from 'src/app/core/models';
import { IdbService } from 'src/app/services/idb.service';

@Component({
  selector: 'nq-ayah-renderer',
  templateUrl: './ayah-renderer.component.html',
  styleUrls: ['./ayah-renderer.component.scss'],
})
export class AyahRendererComponent implements OnInit {
  constructor(private idb: IdbService) {}

  @Input('ayahId') ayahId: number;
  @Input('ayahIndex') ayahIndex: number;
  @Output() onStateChange = new EventEmitter<AyahReadyStateChange>();
  public ayah: any;

  async ngOnInit() {
    try {
      this.ayah = await this.idb.getAyahWithEditons(this.ayahId, [
        'quran.simple',
        'en.sahih',
      ]);
      this.onStateChange.emit({
        ready: true,
        error: '',
        index: this.ayahIndex,
      });
    } catch (error) {
      this.onStateChange.emit({
        ready: false,
        error: error.message,
        index: this.ayahIndex,
      });
      console.error(error);
    }
  }
}
