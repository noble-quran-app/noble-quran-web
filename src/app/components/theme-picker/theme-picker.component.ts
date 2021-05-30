import { Component } from '@angular/core';
import { darkTheme } from 'src/app/data/theme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
})
export class ThemePickerComponent {
  constructor(public themeService: ThemeService) {}
  public darkThemeClass = darkTheme.className;
}
