import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LightTheme, DarkTheme } from '../data/theme';
import { Meta } from '@angular/platform-browser';
import { Theme } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private metaService: Meta) {}

  private themeStorage = 'theme';
  private themeSource = new BehaviorSubject<string>(LightTheme.className);
  public theme = this.themeSource.asObservable();

  setTheme(theme: Theme): void {
    document.querySelector('html').className = theme.className;
    this.metaService.updateTag({
      name: 'theme-color',
      content: theme.appbar_background_color,
    });
    localStorage.setItem(this.themeStorage, JSON.stringify(theme));
    this.themeSource.next(theme.className);
  }

  storedThemeIsDark(): boolean {
    try {
      const storedTheme = JSON.parse(localStorage.getItem(this.themeStorage));
      if (storedTheme.id === DarkTheme.id) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  toggleTheme(): void {
    if (this.storedThemeIsDark()) {
      this.setTheme(LightTheme);
    } else {
      this.setTheme(DarkTheme);
    }
  }

  init() {
    const storedTheme = localStorage.getItem(this.themeStorage);
    if (!storedTheme) {
      this.setTheme(LightTheme);
    } else {
      if (this.storedThemeIsDark()) {
        this.setTheme(DarkTheme);
      } else {
        this.setTheme(LightTheme);
      }
    }
  }
}
