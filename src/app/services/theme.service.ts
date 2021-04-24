import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NobleQuranThemes } from '../data/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  private themeStorage = 'theme';
  private themeSource = new BehaviorSubject<string>(NobleQuranThemes.light);
  public theme = this.themeSource.asObservable();

  setTheme(theme: string) {
    document.querySelector('html').className = theme;
    localStorage.setItem(this.themeStorage, theme);
    this.themeSource.next(theme);
  }

  toggleTheme() {
    if (localStorage.getItem(this.themeStorage) == NobleQuranThemes.light) {
      this.setTheme(NobleQuranThemes.dark);
    } else {
      this.setTheme(NobleQuranThemes.light);
    }
  }

  init() {
    const storedTheme = localStorage.getItem(this.themeStorage);
    if (!storedTheme) {
      this.setTheme(NobleQuranThemes.light);
    } else {
      this.setTheme(storedTheme);
    }
  }
}
