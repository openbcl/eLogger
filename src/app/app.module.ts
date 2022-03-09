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
import { ToastEffects } from './store/toast.effects';
import { ImportDialogComponent } from './dialogs/importdialog/importdialog.component';
import { QRcodeDialogComponent } from './dialogs/qrcodedialog/qrcodedialog.component';
import { ExportLogTemplatesDialogComponent } from './dialogs/exportlogtemplatesdialog/exportlogtemplatesdialog.component';
import { ExportLogsDialogComponent } from './dialogs/exportlogsdialog/exportlogsdialog.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
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
    ImportDialogComponent,
    ExportLogTemplatesDialogComponent,
    ExportLogsDialogComponent,
    QRcodeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    AppRoutingModule,
    ToastModule,
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
    EffectsModule.forRoot([LogTemplateEffects, LogEffects, RecordEffects, ToastEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgxIndexedDBModule.forRoot({
      name: 'eLoggerDB',
      version: 1,
      objectStoresMeta: [
        generateObjectStoreMeta(LOGS, new Log(null, null, null)),
        generateObjectStoreMeta(LOGTEMPLATES, new LogTemplate(null, null)),
        generateObjectStoreMeta(RECORDS, new Record({ name: null, color: null, eventType: 0, icon: null }, null, null))
      ]
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
