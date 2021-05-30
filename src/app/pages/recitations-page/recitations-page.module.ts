import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecitationsPageComponent } from './recitations-page.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

const routes: Routes = [{ path: '', component: RecitationsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [RecitationsPageComponent, VideoDialogComponent],
})
export class RecitationsPageModule {}
