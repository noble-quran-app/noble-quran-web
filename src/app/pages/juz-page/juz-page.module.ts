import { NgModule } from '@angular/core';
import { JuzPageComponent } from './juz-page.component';
import { AyahListRendererModule } from '../../components/ayah-list-renderer/ayah-list-renderer.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: JuzPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), AyahListRendererModule, CommonModule],
  declarations: [JuzPageComponent],
})
export class JuzPageModule {}
