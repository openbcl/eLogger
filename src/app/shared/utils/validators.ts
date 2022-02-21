import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, take, combineLatest, of } from "rxjs";
import { AbstractLog, LogTemplate } from "../models";
import { compareAbstractLog, compareEventTemplates } from "./helper";

export const eventTypeIsUniqueError = 'eventTypeIsUnique';
export const isEqualStringError = 'isEqualString';
export const abstractLogIsUniqueError = 'eventTypeIsUnique';


export class AppValidators {
    static eventTypeIsUnique = (logTemplate$: Observable<LogTemplate>): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => logTemplate$.pipe(
            take(1),
            map(logTemplate => !logTemplate.eventTemplates?.find(eventTemplate =>
                compareEventTemplates(eventTemplate, control.value)) ? null : { [eventTypeIsUniqueError]: true }
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
                compareAbstractLog(abstractLog, control.value)) ? null : { [abstractLogIsUniqueError]: true }
            )
        )
    }
}
