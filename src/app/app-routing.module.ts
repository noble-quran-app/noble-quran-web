import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { HomeMatcher, JuzMatcher, SajdaMatcher, SurahMatcher } from './core/routematch';
import { DefaultComponent } from './pages/default/default.component';
import { HomeComponent } from './pages/home/home.component';
import { JuzComponent } from './pages/juz/juz.component';
import { SajdaComponent } from './pages/sajda/sajda.component';
import { SurahComponent } from './pages/surah/surah.component';

const routes: Routes = [
  {
    matcher: HomeMatcher,
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
    matcher: SajdaMatcher,
    component: SajdaComponent,
  },
  {
    path: '**',
    component: DefaultComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
