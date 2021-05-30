import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyahListBuilderModule } from 'src/app/components/ayah-list-builder/ayah-list-builder.module';
import { SurahPageComponent } from './surah-page.component';

const routes: Routes = [{ path: '', component: SurahPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), AyahListBuilderModule, CommonModule],
  declarations: [SurahPageComponent],
})
export class SurahPageModule {}
