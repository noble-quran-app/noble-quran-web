import { NgModule } from '@angular/core';
import { AyahListRendererComponent } from './ayah-list-renderer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ReadHeaderModule } from './header/header.module';
import { ReadToolbarModule } from './footer/footer.module';
import { AyahRendererModule } from '../ayah-renderer/ayah-renderer.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AyahListRendererComponent],
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    ReadHeaderModule,
    ReadToolbarModule,
    AyahRendererModule,
  ],
  exports: [AyahListRendererComponent],
})
export class AyahListRendererModule {}
