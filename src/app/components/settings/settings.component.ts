import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { setBeep, setQuality, setSeperator } from '../../store/setting.actions';
import { beepSelector, qualitySelector, seperatorSelector } from '../../store/setting.selectors';

@Component({
  selector: 'el-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  displayResetDbDialog = false;

  seperator$ = this.store.pipe(select(seperatorSelector), filter(seperator => !!seperator), tap(seperator => this.form.patchValue({ seperator })));
  beep$ = this.store.pipe(select(beepSelector), filter(beep => beep !== undefined), tap(beep => this.form.patchValue({ beep })));
  quality$ = this.store.pipe(select(qualitySelector), tap(quality => this.form.patchValue({ quality })));

  seperators = [
    {label: ';', value: ';'},
    {label: ',', value: ','}
  ]

  form = this.fb.group({ seperator: null, beep: null, quality: null }) ;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

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

  submitQuality(event: { value: number }) {
    this.store.dispatch(setQuality({
      quality: event.value
    }));
  }
}
