import { Component } from '@angular/core';
import { NobleQuranThemes } from 'src/app/data/theme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'nq-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  constructor(public theme: ThemeService) {}
  public darkTheme = NobleQuranThemes.dark;
}
