import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lightTheme, darkTheme } from '../data/theme';
import { Meta } from '@angular/platform-browser';
import { Theme } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private meta: Meta) {}

  private themeStorage = 'theme';
  public theme = new BehaviorSubject<string>(lightTheme.id);

  setTheme(theme: Theme): void {
    document.querySelector('html').className = theme.className;
    this.meta.updateTag({
      name: 'theme-color',
      content: theme.appbar_background_color,
    });
    localStorage.setItem(this.themeStorage, JSON.stringify(theme));
    this.theme.next(theme.className);
  }

  storedThemeIsDark() {
    try {
      const storedTheme = JSON.parse(localStorage.getItem(this.themeStorage));
      if (storedTheme.id.includes(darkTheme.id)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  toggleTheme() {
    if (this.storedThemeIsDark()) {
      this.setTheme(lightTheme);
    } else {
      this.setTheme(darkTheme);
    }
  }

  initialize() {
    const storedTheme = localStorage.getItem(this.themeStorage);
    if (!storedTheme) {
      this.setTheme(lightTheme);
    } else {
      const storedTheme = this.storedThemeIsDark() ? darkTheme : lightTheme;
      this.setTheme(storedTheme);
    }
  }
}
