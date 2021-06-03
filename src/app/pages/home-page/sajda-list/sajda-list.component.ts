import { Component, OnInit } from '@angular/core';
import { Sajda, Surah } from 'src/app/core/models';
import { Sajdas, Surahs } from 'src/app/data/quran';

@Component({
  selector: 'home-sajda-list',
  templateUrl: './sajda-list.component.html',
  styleUrls: ['./sajda-list.component.scss'],
})
export class SajdaListComponent implements OnInit {
  public sajdas = <Sajda[]>Sajdas;
  public surahs = <Surah[]>Surahs;
  constructor() {}

  ngOnInit(): void {}
}
