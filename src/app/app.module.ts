import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter,MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormComponent } from './components/form.component';
import { FormService } from './components/form.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ FormService,
              {provide:MAT_DATE_LOCALE,useValue:'en-SG'},
              { provide:DateAdapter,
                useClass:MomentDateAdapter,
                deps:[MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS]
              },
              {provide:MAT_DATE_FORMATS,useValue:MAT_MOMENT_DATE_FORMATS},
              { provide: Window, useValue: window }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
