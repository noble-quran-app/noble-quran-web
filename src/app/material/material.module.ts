import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatRippleModule,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';

const MaterialComponents = [
  MatButtonModule,
  MatTabsModule,
  MatListModule,
  MatRippleModule,
  MatProgressBarModule,
  MatMenuModule,
  MatIconModule,
  MatSnackBarModule,
];

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0,
  },
};

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  providers: [
    // { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
})
export class MaterialModule {}
