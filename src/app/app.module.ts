import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { DefaultComponent } from './pages/default/default.component';
import { SurahComponent } from './pages/surah/surah.component';
import { ToArabicNumberPipe } from './pipes/to-arabic-number.pipe';
import { AyahListBuilderComponent } from './components/ayah-list-builder/ayah-list-builder.component';
import { AyahRendererComponent } from './components/ayah-renderer/ayah-renderer.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { NqIconComponent } from './components/nq-icon/nq-icon.component';
import { JuzComponent } from './pages/juz/juz.component';
import { ReadHeaderComponent } from './components/read-header/read-header.component';
import { ListItemComponent } from './pages/home/list-item/list-item.component';
import { ReadToolbarComponent } from './components/read-toolbar/read-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SurahComponent,
    JuzComponent,
    DefaultComponent,
    ToArabicNumberPipe,
    AyahListBuilderComponent,
    AyahRendererComponent,
    ThemeSwitcherComponent,
    NqIconComponent,
    ReadHeaderComponent,
    ListItemComponent,
    ReadToolbarComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
