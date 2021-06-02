import { NgModule } from '@angular/core';
import { RouterModule, NoPreloading, ExtraOptions } from '@angular/router';
import { routes } from './routes';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: NoPreloading,
  relativeLinkResolution: 'corrected',
  scrollOffset: [0, 0],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
