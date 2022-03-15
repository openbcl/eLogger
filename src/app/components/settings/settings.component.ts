import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { setBeep, setLanguage, setSeperator } from '../../store/setting.actions';
import { beepSelector, languageSelector, seperatorSelector } from '../../store/setting.selectors';

@Component({
  selector: 'el-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  language$ = this.store.pipe(select(languageSelector), filter(language => !!language), tap(language => this.form.patchValue({ language })));
  seperator$ = this.store.pipe(select(seperatorSelector), filter(seperator => !!seperator), tap(seperator => this.form.patchValue({ seperator })));
  beep$ = this.store.pipe(select(beepSelector), filter(beep => beep !== undefined), tap(beep => this.form.patchValue({ beep })));

  seperators = [
    {label: ';', value: ';'},
    {label: ',', value: ','}
  ]

  languages = [
    {label: 'English', value: 'en'},
    {label: 'Deutsch', value: 'de'}
  ]

  form = this.fb.group({ language: null, seperator: null, beep: null }) ;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  submitLanguage(event: { value: string }) {
    this.store.dispatch(setLanguage({
      language: event.value
    }));
  }

  submitSeperator(event: { value: string }) {
    this.store.dispatch(setSeperator({
      seperator: event.value
    }));
  }

  submitBeep(event: { checked: boolean }) {
    this.store.dispatch(setBeep({
      beep: event.checked
    }));
  }
}
