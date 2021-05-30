import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { HomeMatcher, JuzMatcher, SajdaMatcher, SurahMatcher } from './core/routematch';

function hideSplash() {
  if (document.querySelector('.splash')) {
    const splashNodes = Array.from(document.querySelectorAll('.splash'));
    splashNodes.forEach((el) => el.parentElement.removeChild(el));
  }
}

const routes: Routes = [
  {
    matcher: HomeMatcher,
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home-page/home-page.module')
        .then((m) => m.HomePageModule)
        .finally(hideSplash),
  },
  {
    matcher: SurahMatcher,
    loadChildren: () =>
      import('./pages/surah-page/surah-page.module')
        .then((m) => m.SurahPageModule)
        .finally(hideSplash),
  },
  {
    matcher: JuzMatcher,
    loadChildren: () =>
      import('./pages/juz-page/juz-page.module').then((m) => m.JuzPageModule).finally(hideSplash),
  },
  {
    matcher: SajdaMatcher,
    loadChildren: () =>
      import('./pages/sajda-page/sajda-page.module')
        .then((m) => m.SajdaPageModule)
        .finally(hideSplash),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/default-page/default-page.module')
        .then((m) => m.PageNotFoundModule)
        .finally(hideSplash),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: NoPreloading,
      relativeLinkResolution: 'corrected',
      scrollOffset: [0, 0],
      // anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
