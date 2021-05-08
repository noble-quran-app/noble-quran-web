import { ComponentType } from '@angular/cdk/portal';
import { EmbeddedViewRef, Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ToastConfig extends MatSnackBarConfig {
  message: string;
  duration?: number;
  action?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackbar: MatSnackBar) {}

  open(message: any, duration: number = 3000, action: string = null, config?: MatSnackBarConfig) {
    return this.snackbar.open(message, action, {
      duration,
      ...config,
    });
  }

  openWithAction(message: any, action: string | number | boolean, duration: number = 3000) {
    return this.open(message, duration, action.toString()).onAction();
  }

  openWithConfig(config: ToastConfig) {
    const { message, duration = 3000, action = null } = config;

    delete config.message;
    delete config.action;
    delete config.duration;

    return this.open(message, duration, action, config);
  }

  openFromComponent<T>(component: ComponentType<T>, config?: MatSnackBarConfig): MatSnackBarRef<T> {
    return this.snackbar.openFromComponent(component, config);
  }

  openFromTemplate(
    template: TemplateRef<any>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<EmbeddedViewRef<any>> {
    return this.snackbar.openFromTemplate(template, config);
  }

  dismiss(): void {
    this.snackbar.dismiss();
  }
}
