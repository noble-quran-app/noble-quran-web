import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ThemeService } from './services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private themeService: ThemeService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.themeService.init();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.snackBar
          .open('New version available.', 'Update', {
            duration: 15000,
          })
          .onAction()
          .subscribe(() => window.location.reload());
      });
    }
  }
}
