import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialIconModule } from '../material-icon/material-icon.module';
import { ReadFooterComponent } from './read-footer.component';

@NgModule({
  declarations: [ReadFooterComponent],
  exports: [ReadFooterComponent],
  imports: [MatButtonModule, CommonModule, MaterialIconModule, MatProgressSpinnerModule],
})
export class ReadToolbarModule {}
