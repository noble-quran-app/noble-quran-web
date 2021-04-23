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
import { EmptyComponent } from './components/empty/empty.component';
import { ToArabicNumberPipe } from './pipes/to-arabic-number.pipe';
import { AyahEndComponent } from './components/icons/ayahEnd.component';
import { AyahListBuilderComponent } from './components/ayah-list-builder/ayah-list-builder.component';
import { AyahRendererComponent } from './components/ayah-renderer/ayah-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultComponent,
    SurahComponent,
    EmptyComponent,
    ToArabicNumberPipe,
    AyahEndComponent,
    AyahListBuilderComponent,
    AyahRendererComponent,
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
