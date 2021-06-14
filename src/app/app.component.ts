import { Component, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'noble-quran-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private theme: ThemeService, private update: UpdateService) {}

  public splashCompleted = false;

  @HostListener('document:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.theme.initialize();
    this.update.initialize();

    fromEvent(document, 'splashcomplete')
      .pipe(take(1))
      .subscribe(() => (this.splashCompleted = true));
  }
}
