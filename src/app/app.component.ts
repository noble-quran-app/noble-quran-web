import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';
import { UpdateService } from './services/update.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'noble-quran-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private update: UpdateService,
    private navigator: NavigationService
  ) {
    this.theme.initialize();
    this.update.initialize();
    this.navigator.initialize();
  }

  public splashCompleted = false;

  @HostListener('document:keydown.control.x', ['$event'])
  toggleTheme(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    fromEvent(document, 'splash')
      .pipe(take(1))
      .subscribe(() => {
        this.splashCompleted = true;
      });
  }
}
