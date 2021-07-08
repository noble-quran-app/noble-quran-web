import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyahListRendererModule } from 'src/app/components/ayah-list-renderer/ayah-list-renderer.module';
import { SajdaPageComponent } from './sajda-page.component';

const routes: Routes = [{ path: '', component: SajdaPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, AyahListRendererModule],
  declarations: [SajdaPageComponent],
})
export class SajdaPageModule {}
