import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { DefaultComponent } from './pages/default/default.component';
import { SurahComponent } from './pages/surah/surah.component';
import { ToArabicNumberPipe } from './pipes/to-arabic-decimal.pipe';
import { AyahListBuilderComponent } from './components/ayah-list-builder/ayah-list-builder.component';
import { AyahRendererComponent } from './components/ayah-renderer/ayah-renderer.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { JuzComponent } from './pages/juz/juz.component';
import { ReadHeaderComponent } from './components/read-header/read-header.component';
import { ListItemComponent } from './pages/home/list-item/list-item.component';
import { ReadToolbarComponent } from './components/read-toolbar/read-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SajdaComponent } from './pages/sajda/sajda.component';
import { CommonModule } from '@angular/common';

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
    SvgIconComponent,
    ReadHeaderComponent,
    ListItemComponent,
    ReadToolbarComponent,
    SajdaComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:10000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
