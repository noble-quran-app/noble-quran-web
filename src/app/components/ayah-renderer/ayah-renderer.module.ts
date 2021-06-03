import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToArabicNumberPipe } from 'src/app/pipes/to-arabic-decimal.pipe';
import { AyahRendererComponent } from './ayah-renderer.component';

@NgModule({
  declarations: [AyahRendererComponent, ToArabicNumberPipe],
  imports: [CommonModule],
  exports: [AyahRendererComponent],
})
export class AyahRendererModule {}
