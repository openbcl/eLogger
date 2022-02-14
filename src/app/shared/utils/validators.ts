import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable, take } from "rxjs";
import { LogTemplate } from "../models";
import { compareEventTemplates } from "./helper";

export const eventTypeIsUniqueError = 'eventTypeIsUnique';
export const isEqualStringError = 'isEqualString';

export class AppValidators {
    static eventTypeIsUnique = (logTemplate$: Observable<LogTemplate>): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => logTemplate$.pipe(
            take(1),
            map(logTemplate => !logTemplate.eventTemplates?.find(eventTemplate =>
                compareEventTemplates(eventTemplate, control.value)) ? null : { [eventTypeIsUniqueError]: true }
            )
        )
    }

    static isEqualString = (input: { value: string }): ValidatorFn => {
        return(control: AbstractControl): ValidationErrors | null => input.value === control.value ? null : { [isEqualStringError]: true }
    }
}
