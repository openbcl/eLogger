import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LogEffects } from './store/log.effects';
import { UiModule } from '../ui/ui.module';
import { LogsComponent } from './components/logs/logs.component';
import { CreateLogDialogComponent } from './components/dialogs/createlogdialog/createlogdialog.component';
import * as fromLog from './store/log.reducer';
import { DeleteLogDialogComponent } from './components/dialogs/deletelogdialog/deletelogdialog.component';
import { LogComponent } from './components/log/log.component';



@NgModule({
  declarations: [
    LogsComponent,
    CreateLogDialogComponent,
    DeleteLogDialogComponent,
    LogComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    UiModule,
    StoreModule.forFeature(fromLog.logFeatureKey, fromLog.logReducer),
    EffectsModule.forFeature([LogEffects])
  ]
})
export class LogsModule { }
