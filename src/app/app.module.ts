import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ThemePickerModule } from './components/theme-picker/theme-picker.module';
import { SvgIconModule } from './components/svg-icon/svg-icon.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // CommonModule,
    BrowserModule,
    MatSnackBarModule,

    HttpClientModule,
    // MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
