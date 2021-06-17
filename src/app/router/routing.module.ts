import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { AppRoutes } from './app-routes';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, routerConfig)],
  exports: [RouterModule],
})
export class RoutingModule {}
