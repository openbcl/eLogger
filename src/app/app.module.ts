import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgxIndexedDBModule, ObjectStoreMeta, ObjectStoreSchema } from 'ngx-indexed-db';
import { LOGS, Log, LOGTYPES, LogType } from './shared/models';
import { UiModule } from './ui/ui.module';

const generateStoreSchema = (obj: any): ObjectStoreSchema[] => {
  return Object.getOwnPropertyNames(obj).map(property => ({
    name: property,
    keypath: property,
    options: {
      unique: property === 'id'
    }
  }));
}

const generateObjectStoreMeta = (store: string, templateValue: any): ObjectStoreMeta => {
  return {
    store,
    storeConfig: { keyPath: 'key', autoIncrement: true },
    storeSchema: generateStoreSchema(templateValue)
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({}, {}),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 100 }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    NgxIndexedDBModule.forRoot({
      name: 'eLoggerDB',
      version: 1,
      objectStoresMeta: [
        generateObjectStoreMeta(LOGS, new Log(null)),
        generateObjectStoreMeta(LOGTYPES, new LogType(null))
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
