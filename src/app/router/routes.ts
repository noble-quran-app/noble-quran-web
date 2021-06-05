import { Routes } from '@angular/router';
import { removeElements } from '../core/functions';
import { JuzMatcher, SajdaMatcher, SurahMatcher } from './matchers';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/home-page/home-page.module')
        .then((m) => m.HomePageModule)
        .finally(removeElements),
  },
  {
    matcher: SurahMatcher,
    loadChildren: () =>
      import('../pages/surah-page/surah-page.module')
        .then((m) => m.SurahPageModule)
        .finally(removeElements),
  },
  {
    matcher: JuzMatcher,
    loadChildren: () =>
      import('../pages/juz-page/juz-page.module')
        .then((m) => m.JuzPageModule)
        .finally(removeElements),
  },
  {
    matcher: SajdaMatcher,
    loadChildren: () =>
      import('../pages/sajda-page/sajda-page.module')
        .then((m) => m.SajdaPageModule)
        .finally(removeElements),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/default-page/default-page.module')
        .then((m) => m.PageNotFoundModule)
        .finally(removeElements),
  },
];
