import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemePickerModule } from 'src/app/components/theme-picker/theme-picker.module';
import { HomePageComponent } from './home-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SurahListComponent } from './surah-list/surah-list.component';
import { JuzListComponent } from './juz-list/juz-list.component';
import { SajdaListComponent } from './sajda-list/sajda-list.component';
import { MaterialIconModule } from 'src/app/components/material-icon/material-icon.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', component: SurahListComponent },
      { path: 'juz', component: JuzListComponent },
      { path: 'sajda', component: SajdaListComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ThemePickerModule,
    MatTabsModule,
    MatListModule,
    MatTooltipModule,
    MaterialIconModule,
  ],
  declarations: [HomePageComponent, SurahListComponent, JuzListComponent, SajdaListComponent],
})
export class HomePageModule {}
