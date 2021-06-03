import { Component, OnInit } from '@angular/core';
import { Surah } from 'src/app/core/models';
import { Surahs } from 'src/app/data/quran';

@Component({
  selector: 'home-surah-list',
  templateUrl: './surah-list.component.html',
  styleUrls: ['./surah-list.component.scss'],
})
export class SurahListComponent implements OnInit {
  public surahs = <Surah[]>Surahs;
  constructor() {}

  ngOnInit(): void {}
}
