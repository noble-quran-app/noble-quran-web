import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { getAyahURL } from 'src/assets/quran/helpers';

@Component({
  selector: 'nq-ayah-renderer',
  templateUrl: './ayah-renderer.component.html',
  styleUrls: ['./ayah-renderer.component.scss'],
})
export class AyahRendererComponent implements OnInit {
  @Input('ayahId') ayahId: number;
  public ayah;
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const [ar, tr] = await Promise.all([
      this.http.get(getAyahURL(this.ayahId, 'ar')).toPromise(),
      this.http.get(getAyahURL(this.ayahId, 'tr')).toPromise(),
    ]);
    this.ayah = { ...ar, ...tr };
  }
}
