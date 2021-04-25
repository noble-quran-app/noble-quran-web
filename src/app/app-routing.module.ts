import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuzMatcher, SurahMatcher } from './core/routematch';
import { DefaultComponent } from './pages/default/default.component';
import { HomeComponent } from './pages/home/home.component';
import { JuzComponent } from './pages/juz/juz.component';
import { SurahComponent } from './pages/surah/surah.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    matcher: SurahMatcher,
    component: SurahComponent,
  },
  {
    matcher: JuzMatcher,
    component: JuzComponent,
  },
  {
    path: '**',
    component: DefaultComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
