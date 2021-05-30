import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyahListBuilderModule } from 'src/app/components/ayah-list-builder/ayah-list-builder.module';
import { SajdaPageComponent } from './sajda-page.component';

const routes: Routes = [{ path: '', component: SajdaPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, AyahListBuilderModule],
  declarations: [SajdaPageComponent],
})
export class SajdaPageModule {}
