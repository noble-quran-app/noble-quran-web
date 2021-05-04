import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Juzs, Surahs } from '../data/quran';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title) {}

  baseTitle = 'The Noble Quran';

  setTitleForHome() {
    this.title.setTitle(this.baseTitle);
  }

  setTitleForSurah(surahId: number) {
    const newTitle = `Surah ${Surahs[surahId - 1].englishName} - ${this.baseTitle}`;
    this.title.setTitle(newTitle);
  }

  setTitleForJuz(juzId: number) {
    const newTitle = `${Juzs[juzId - 1].title} - ${this.baseTitle}`;
    this.title.setTitle(newTitle);
  }

  setTitleForSajda(sajdaId: number) {
    const newTitle = `Sajda ${sajdaId} - ${this.baseTitle}`;
    this.title.setTitle(newTitle);
  }

  setTitleForDefault() {
    const newTitle = `Not found - ${this.baseTitle}`;
    this.title.setTitle(newTitle);
  }
}
