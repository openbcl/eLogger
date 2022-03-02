import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable, take, combineLatest, of } from "rxjs";
import { AbstractLog, Log, LogTemplate } from "../models";
import { compareAbstractLog, compareEventTemplates, toJSON } from "./helper";

export const eventTypeIsUniqueError = 'eventTypeIsUnique';
export const isEqualStringError = 'isEqualString';
export const abstractLogIsUniqueError = 'eventTypeIsUnique';
export const isQRcodeCompatibleError = 'isQRcodeCompatible';

export class AppValidators {
    static eventTypeIsUnique = (logTemplate$: Observable<LogTemplate>): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => logTemplate$.pipe(
            take(1),
            map(logTemplate => !logTemplate.eventTemplates?.find(eventTemplate =>
                compareEventTemplates(eventTemplate, !!control.value.name ? control.value : control.value.selectedTemplate)) ? null : { [eventTypeIsUniqueError]: true }
            )
        )
    }

    static isEqualString = (value$: Observable<string>): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => value$.pipe(
            take(1),
            map(value => value === control.value ? null : { [isEqualStringError]: true })
        )
    }

    static abstractLogIsUnique = (abstractLogs$: Observable<AbstractLog[]>, self$?: Observable<AbstractLog>): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => combineLatest([abstractLogs$, self$ || of(null)]).pipe(
            take(1),
            map(combined => !combined[0].filter(abstractLog => abstractLog.id !== combined[1]?.id).find(abstractLog =>
                compareAbstractLog(abstractLog, control.value, (<Log>combined[1])?.logTemplateId)) ? null : { [abstractLogIsUniqueError]: true }
            )
        )
    }

    static isQRcodeCompatible = (key: string): ValidatorFn => (control: AbstractControl): (ValidationErrors | null) => {
        const size = new Blob([toJSON(control.value[Object.keys(control.value)[0]], key, true, false)], { type: 'text/json' }).size;
        return size <= 2953 ? null : { [abstractLogIsUniqueError]: true }
    }
}
