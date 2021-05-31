import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [MatTooltipModule, CommonModule, SvgIconModule, MatRippleModule],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
})
export class ThemePickerModule {}
