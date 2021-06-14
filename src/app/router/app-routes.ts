import { Routes } from '@angular/router';
import { JuzMatcher, SajdaMatcher, SurahMatcher } from './route-matchers';

const dispathRouteLoadEvent = () => {
  document.dispatchEvent(new CustomEvent('routeloaded'));
};

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/home-page/home-page.module')
        .then((m) => m.HomePageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    matcher: SurahMatcher,
    loadChildren: () =>
      import('../pages/surah-page/surah-page.module')
        .then((m) => m.SurahPageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    matcher: JuzMatcher,
    loadChildren: () =>
      import('../pages/juz-page/juz-page.module')
        .then((m) => m.JuzPageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    matcher: SajdaMatcher,
    loadChildren: () =>
      import('../pages/sajda-page/sajda-page.module')
        .then((m) => m.SajdaPageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/default-page/default-page.module')
        .then((m) => m.PageNotFoundModule)
        .finally(dispathRouteLoadEvent),
  },
];
