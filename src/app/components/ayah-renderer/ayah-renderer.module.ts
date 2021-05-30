import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToArabicNumberPipe } from 'src/app/pipes/to-arabic-decimal.pipe';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { AyahRendererComponent } from './ayah-renderer.component';

@NgModule({
  declarations: [AyahRendererComponent, ToArabicNumberPipe],
  imports: [SvgIconModule, CommonModule],
  exports: [AyahRendererComponent],
})
export class AyahRendererModule {}
