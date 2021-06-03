import { Component, OnInit } from '@angular/core';
import { Juz } from 'src/app/core/models';
import { Juzs } from 'src/app/data/quran';

@Component({
  selector: 'home-juz-list',
  templateUrl: './juz-list.component.html',
  styleUrls: ['./juz-list.component.scss'],
})
export class JuzListComponent implements OnInit {
  public juzs = <Juz[]>Juzs;
  constructor() {}

  ngOnInit(): void {}
}
