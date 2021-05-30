import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconModule } from 'src/app/components/svg-icon/svg-icon.module';
import { ThemePickerModule } from 'src/app/components/theme-picker/theme-picker.module';
import { HomePageComponent } from './home-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SvgIconModule,
    ThemePickerModule,
    MatTabsModule,
    MatListModule,
  ],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
