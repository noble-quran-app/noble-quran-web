import { NgModule } from '@angular/core';
import { ReadHeaderComponent } from './read-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '../svg-icon/svg-icon.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatIconModule,
    MatMenuModule,
    RouterModule,
    SvgIconModule,
    CommonModule,
    MatButtonModule,
  ],
  exports: [ReadHeaderComponent],
  declarations: [ReadHeaderComponent],
})
export class ReadHeaderModule {}
