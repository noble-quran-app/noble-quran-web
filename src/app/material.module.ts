import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
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
