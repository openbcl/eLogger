import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { combineLatest, map } from 'rxjs';
import { LOGS, RECORDS, TEMPLATES } from '../models';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private settings = {
    theme: 'theme',
    seperator: 'seperator',
    language: 'language',
    beep: 'beep'
  }

  constructor(private db: NgxIndexedDBService) { }
  
  loadTheme() {
    return localStorage.getItem(this.settings.theme) || 'light'
  }

  setTheme(theme: string) {
    localStorage.setItem(this.settings.theme, theme);
    return theme;
  }

  loadSeperator() {
    return localStorage.getItem(this.settings.seperator);
  }

  setSeperator(seperator: string) {
    localStorage.setItem(this.settings.seperator, seperator);
    return seperator;
  }

  loadLanguage() {
    return localStorage.getItem(this.settings.language);
  }

  setLanguage(language: string) {
    localStorage.setItem(this.settings.language, language);
    return language;
  }

  loadBeep() {
    return localStorage.getItem(this.settings.beep) === 'true';
  }
  
  setBeep(beep: boolean) {
    localStorage.setItem(this.settings.beep, beep ? 'true' : 'false');
    return beep;
  }

  resetDB() {
    return combineLatest([
      this.db.clear(RECORDS),
      this.db.clear(LOGS),
      this.db.clear(TEMPLATES)
    ]).pipe(
      map(values => values.reduce((prev, current) => prev === current && prev === true, true)),
      map(success => processResult(success, success, 'Could not reset database.'))
    )
  }


}
