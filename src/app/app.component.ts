import { Component, HostListener } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { IdbService } from './services/idb.service';
import { NetworkService } from './services/network.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private theme: ThemeService,
    private idb: IdbService,
    private network: NetworkService,
    private update: UpdateService
  ) {}

  @HostListener('window:keydown.control.x', ['$event'])
  themeChange(event: KeyboardEvent) {
    event.preventDefault();
    this.theme.toggleTheme();
  }

  ngOnInit() {
    this.idb.initialize();
    this.network.initialize();
    this.theme.initialize();
    this.update.initialize();
  }
}
