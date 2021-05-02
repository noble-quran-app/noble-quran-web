import { Component } from '@angular/core';
import { darkTheme } from 'src/app/data/theme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'nq-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}
  public darkThemeClass = darkTheme.className;
}
