import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromSetting from './store/setting.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SettingEffects } from './store/setting.effects';
import { UiModule } from '../ui/ui.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    UiModule,
    StoreModule.forFeature(fromSetting.settingFeatureKey, fromSetting.reducer),
    EffectsModule.forFeature([SettingEffects])
  ]
})
export class SettingsModule { }
