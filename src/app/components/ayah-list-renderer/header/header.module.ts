import { NgModule } from '@angular/core';
import { ReadHeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MaterialIconModule } from '../../material-icon/material-icon.module';

@NgModule({
  imports: [MaterialIconModule, MatMenuModule, RouterModule, CommonModule, MatButtonModule],
  exports: [ReadHeaderComponent],
  declarations: [ReadHeaderComponent],
})
export class ReadHeaderModule {}
