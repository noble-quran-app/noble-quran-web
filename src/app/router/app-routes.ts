import { Routes } from '@angular/router';
import { JuzPageMatcher, SajdaPageMatcher, SurahPageMatcher } from './route-matchers';

const dispathRouteLoadEvent = () => {
  window.dispatchEvent(new CustomEvent('routeloaded'));
};

export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/home-page/home-page.module')
        .then((m) => m.HomePageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    matcher: SurahPageMatcher,
    loadChildren: () =>
      import('../pages/surah-page/surah-page.module')
        .then((m) => m.SurahPageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    matcher: JuzPageMatcher,
    loadChildren: () =>
      import('../pages/juz-page/juz-page.module')
        .then((m) => m.JuzPageModule)
        .finally(dispathRouteLoadEvent),
  },
  {
    matcher: SajdaPageMatcher,
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
