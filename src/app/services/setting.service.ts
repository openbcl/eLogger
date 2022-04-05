import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { combineLatest, map } from 'rxjs';
import { LOGS, RECORDS, TEMPLATES } from '../models';
import { initialSettingsState } from '../store/setting.reducer';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private settings = {
    theme: 'theme',
    seperator: 'seperator',
    beep: 'beep',
    quality: 'quality'
  }

  constructor(private db: NgxIndexedDBService) { }
  
  loadTheme() {
    return localStorage.getItem(this.settings.theme) || initialSettingsState.theme
  }

  setTheme(theme: string) {
    localStorage.setItem(this.settings.theme, theme);
    return theme;
  }

  loadSeperator() {
    return localStorage.getItem(this.settings.seperator) || initialSettingsState.seperator;
  }

  setSeperator(seperator: string) {
    localStorage.setItem(this.settings.seperator, seperator);
    return seperator;
  }

  loadBeep() {
    return localStorage.getItem(this.settings.beep) === 'true';
  }
  
  setBeep(beep: boolean) {
    localStorage.setItem(this.settings.beep, beep ? 'true' : 'false');
    return beep;
  }

  loadQuality() {
    return parseInt(localStorage.getItem(this.settings.quality) ||  initialSettingsState.quality.toString());
  }
  
  setQuality(quality: number) {
    localStorage.setItem(this.settings.quality, quality.toString());
    return quality;
  }

  resetDB() {
    return combineLatest([
      this.db.clear(RECORDS),
      this.db.clear(LOGS),
      this.db.clear(TEMPLATES)
    ]).pipe(
      map(values => values.reduce((prev, current) => prev === current && prev === true, true)),
      map(success => processResult(success, success, $localize`:Reset database error@@SettingService\:resetError:Could not reset database.`))
    )
  }


}
