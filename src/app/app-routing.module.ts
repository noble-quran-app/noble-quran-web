import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
} from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { HomeComponent } from './pages/home/home.component';
import { SurahComponent } from './pages/surah/surah.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    matcher: (url): UrlMatchResult => {
      if (url[0].path.match(/^([1-9][0-9]?|10[0-9]|11[0-4])$/gm)) {
        return { consumed: url };
      }
      return null;
    },
    component: SurahComponent,
  },
  {
    path: '**',
    component: DefaultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
