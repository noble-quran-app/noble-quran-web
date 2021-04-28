import { Component, Input, OnInit } from '@angular/core';
import { IdbService } from 'src/app/services/idb.service';

@Component({
  selector: 'nq-ayah-renderer',
  templateUrl: './ayah-renderer.component.html',
  styleUrls: ['./ayah-renderer.component.scss'],
})
export class AyahRendererComponent implements OnInit {
  @Input('ayahId') ayahId: number;
  @Input('ayahIndex') ayahIndex: number;
  public ayah;
  constructor(private idb: IdbService) {}

  async ngOnInit() {
    try {
      this.ayah = await this.idb.getAyahWithEditons(this.ayahId, [
        'quran.simple',
        'en.sahih',
      ]);
    } catch (error) {
      console.error(error);
    }
  }
}
