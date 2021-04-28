import { Component, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ThemeService } from './services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdbService } from './services/idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private themeService: ThemeService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private idb: IdbService
  ) {}

  @HostListener('window:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }

  ngOnInit() {
    this.idb.init();
    this.themeService.init();
    history.scrollRestoration = 'manual';

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.snackBar
          .open('New version is available.', 'Update', {
            duration: 15000,
          })
          .onAction()
          .subscribe(() => window.location.reload());
      });
    }
  }
}
