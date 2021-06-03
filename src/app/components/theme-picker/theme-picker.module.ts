import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MaterialIconModule } from '../material-icon/material-icon.module';

@NgModule({
  imports: [MatTooltipModule, MaterialIconModule, CommonModule, MatRippleModule],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
})
export class ThemePickerModule {}
