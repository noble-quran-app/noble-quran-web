import { Component, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ThemeService } from './services/theme.service';
import { IdbService } from './services/idb.service';
import { ToastService } from './services/toast.service';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private themeService: ThemeService,
    private swUpdate: SwUpdate,
    private idb: IdbService,
    private toast: ToastService,
    private network: NetworkService
  ) {}

  @HostListener('window:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }

  ngOnInit() {
    this.idb.init();
    this.network.init();
    this.themeService.init();
    history.scrollRestoration = 'manual';

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.toast
          .openWithAction('New version is available.', 'Update', 15000)
          .subscribe(() => location.reload());
      });
    }
  }
}
