import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyahListRendererModule } from 'src/app/components/ayah-list-renderer/ayah-list-renderer.module';
import { SurahPageComponent } from './surah-page.component';

const routes: Routes = [{ path: '', component: SurahPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), AyahListRendererModule, CommonModule],
  declarations: [SurahPageComponent],
})
export class SurahPageModule {}
