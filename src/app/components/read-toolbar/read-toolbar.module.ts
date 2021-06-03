import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialIconModule } from '../material-icon/material-icon.module';
import { ReadToolbarComponent } from './read-toolbar.component';

@NgModule({
  declarations: [ReadToolbarComponent],
  exports: [ReadToolbarComponent],
  imports: [MatButtonModule, CommonModule, MaterialIconModule, MatProgressSpinnerModule],
})
export class ReadToolbarModule {}
