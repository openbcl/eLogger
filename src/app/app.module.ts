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
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgxIndexedDBModule, ObjectStoreMeta, ObjectStoreSchema } from 'ngx-indexed-db';
import { LOGS, Log, LOGTEMPLATES, LogTemplate, Record, RECORDS } from './shared/models';
import { UiModule } from './ui/ui.module';
import { LogTemplateEffects } from './store/logtemplate.effects';
import { LogEffects } from './store/log.effects';
import { RecordEffects } from './store/record.effects';
import { routerFeatureKey } from './store/router.selector';
import { ImportLogTemplatesDialogComponent } from './dialogs/importlogtemplatesdialog/importlogtemplatesdialog.component';
import { ImportLogsDialogComponent } from './dialogs/importlogsdialog/importlogsdialog.component';
import { ExportLogTemplatesDialogComponent } from './dialogs/exportlogtemplatesdialog/exportlogtemplatesdialog.component';
import { ExportLogsDialogComponent } from './dialogs/exportlogsdialog/exportlogsdialog.component';
import * as fromLogTemplate from './store/logtemplate.reducer';
import * as fromLog from './store/log.reducer';
import * as fromRecord from './store/record.reducer';


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
    AppComponent,
    ImportLogTemplatesDialogComponent,
    ImportLogsDialogComponent,
    ExportLogTemplatesDialogComponent,
    ExportLogsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({
      [fromLogTemplate.logTemplatesFeatureKey]: fromLogTemplate.logTemplatesReducer,
      [fromLog.logsFeatureKey]: fromLog.logsReducer,
      [fromRecord.recordsFeatureKey]: fromRecord.recordsReducer,
      [routerFeatureKey]: routerReducer
    }, {}),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 100 }),
    EffectsModule.forRoot([LogTemplateEffects, LogEffects, RecordEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgxIndexedDBModule.forRoot({
      name: 'eLoggerDB',
      version: 1,
      objectStoresMeta: [
        generateObjectStoreMeta(LOGS, new Log(null)),
        generateObjectStoreMeta(LOGTEMPLATES, new LogTemplate(null)),
        generateObjectStoreMeta(RECORDS, new Record({ name: null, color: null, eventType: 0, icon: null }, null, null))
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
