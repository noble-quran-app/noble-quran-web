import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPage } from './default-page.component';

const routes: Routes = [{ path: '', component: DefaultPage }];

@NgModule({
  imports: [MatButtonModule, RouterModule.forChild(routes)],
  declarations: [DefaultPage],
})
export class PageNotFoundModule {}
