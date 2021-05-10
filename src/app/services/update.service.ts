import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public updating = new BehaviorSubject<boolean>(false);

  constructor(private swUpdate: SwUpdate, private toast: ToastService) {}

  public setPendingStatus(isPending: boolean) {
    localStorage.setItem('update', JSON.stringify({ pending: isPending }));
  }

  public updatePending() {
    try {
      if (!localStorage.getItem('update')) {
        this.setPendingStatus(false);
        return false;
      }
      return JSON.parse(localStorage.getItem('update'))['pending'];
    } catch (error) {
      return true;
    }
  }

  private openUpdateBanner() {
    this.toast
      .openWithAction('New version is available.', 'Update', 15000)
      .subscribe(() => window.location.reload());
  }

  initialize() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.setPendingStatus(true);
        this.openUpdateBanner();
      });
    }
  }
}
