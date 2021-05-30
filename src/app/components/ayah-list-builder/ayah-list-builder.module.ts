import { NgModule } from '@angular/core';
import { ToArabicNumberPipe } from 'src/app/pipes/to-arabic-decimal.pipe';
import { AyahRendererComponent } from '../ayah-renderer/ayah-renderer.component';
import { ReadToolbarComponent } from '../read-toolbar/read-toolbar.component';
import { AyahListBuilderComponent } from './ayah-list-builder.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReadHeaderModule } from '../read-header/read-header.module';
import { ReadToolbarModule } from '../read-toolbar/read-toolbar.module';
import { AyahRendererModule } from '../ayah-renderer/ayah-renderer.module'

@NgModule({
  declarations: [AyahListBuilderComponent],
  imports: [MatProgressBarModule, MatCardModule, CommonModule, ReadHeaderModule, ReadToolbarModule,AyahRendererModule],
  exports: [AyahListBuilderComponent],
  providers: [],
})
export class AyahListBuilderModule {}
