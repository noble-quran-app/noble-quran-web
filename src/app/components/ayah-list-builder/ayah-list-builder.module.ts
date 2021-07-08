import { NgModule } from '@angular/core';
import { AyahListBuilderComponent } from './ayah-list-builder.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ReadHeaderModule } from '../read-header/read-header.module';
import { ReadToolbarModule } from '../read-footer/read-footer.module';
import { AyahRendererModule } from '../ayah-renderer/ayah-renderer.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AyahListBuilderComponent],
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    ReadHeaderModule,
    ReadToolbarModule,
    AyahRendererModule,
  ],
  exports: [AyahListBuilderComponent],
  providers: [],
})
export class AyahListBuilderModule {}
