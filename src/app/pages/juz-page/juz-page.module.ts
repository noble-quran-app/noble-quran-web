import { NgModule } from '@angular/core';
import { JuzPageComponent } from './juz-page.component';
import { AyahListBuilderModule } from '../../components/ayah-list-builder/ayah-list-builder.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: JuzPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), AyahListBuilderModule, CommonModule],
  declarations: [JuzPageComponent],
})
export class JuzPageModule {}
