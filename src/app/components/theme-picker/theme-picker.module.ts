import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatTooltipModule, CommonModule, SvgIconModule, MatButtonModule],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
})
export class ThemePickerModule {}
