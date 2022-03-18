import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgxIndexedDBModule, ObjectStoreMeta, ObjectStoreSchema } from 'ngx-indexed-db';
import { LOGS, Log, TEMPLATES, Template, Record, RECORDS } from './models';
import { UiModule } from './ui/ui.module';
import { TemplateEffects } from './store/template.effects';
import { LogEffects } from './store/log.effects';
import { RecordEffects } from './store/record.effects';
import { SettingEffects } from './store/setting.effects';
import { ToastEffects } from './store/toast.effects';
import { routerFeatureKey } from './store/router.selector';
import { ImportDialogComponent } from './components/dialogs/importdialog/importdialog.component';
import { QRcodeDialogComponent } from './components/dialogs/qrcodedialog/qrcodedialog.component';
import { ExportTemplatesDialogComponent } from './components/dialogs/exporttemplatesdialog/exporttemplatesdialog.component';
import { ExportLogsDialogComponent } from './components/dialogs/exportlogsdialog/exportlogsdialog.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import * as fromTemplate from './store/template.reducer';
import * as fromLog from './store/log.reducer';
import * as fromRecord from './store/record.reducer';
import * as fromSetting from './store/setting.reducer';
import { InfoComponent } from './components/info/info.component';


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
    SettingsComponent,
    ImportDialogComponent,
    ExportTemplatesDialogComponent,
    ExportLogsDialogComponent,
    QRcodeDialogComponent,
    InfoComponent
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
      [fromTemplate.templatesFeatureKey]: fromTemplate.templatesReducer,
      [fromLog.logsFeatureKey]: fromLog.logsReducer,
      [fromRecord.recordsFeatureKey]: fromRecord.recordsReducer,
      [fromSetting.settingsFeatureKey]: fromSetting.settingsReducer,
      [routerFeatureKey]: routerReducer
    }, {}),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 100 }),
    EffectsModule.forRoot([TemplateEffects, LogEffects, RecordEffects, ToastEffects, SettingEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgxIndexedDBModule.forRoot({
      name: 'eLoggerDB',
      version: 1,
      objectStoresMeta: [
        generateObjectStoreMeta(LOGS, new Log(null, null, null)),
        generateObjectStoreMeta(TEMPLATES, new Template(null, null)),
        generateObjectStoreMeta(RECORDS, new Record({ name: null, color: null, eventType: 0, icon: null }, null, null))
      ]
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
