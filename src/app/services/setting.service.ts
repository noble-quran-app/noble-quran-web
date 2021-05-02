import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor() {}

  public renderAsPage = new BehaviorSubject(false);

  switchView() {
    this.renderAsPage.next(!this.renderAsPage.value);
  }
}
