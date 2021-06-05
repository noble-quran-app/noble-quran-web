import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { routes } from './routes';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
  scrollOffset: [80, 80],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
