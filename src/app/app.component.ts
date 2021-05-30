import { Component, HostListener } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'noble-quran-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private theme: ThemeService, private update: UpdateService) {}

  @HostListener('window:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.theme.initialize();
    this.update.initialize();
  }
}
