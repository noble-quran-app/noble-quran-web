import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReadToolbarComponent } from './read-toolbar.component';

@NgModule({
  declarations: [ReadToolbarComponent],
  exports: [ReadToolbarComponent],
  imports: [MatButtonModule, CommonModule, MatIconModule, MatProgressSpinnerModule],
})
export class ReadToolbarModule {}