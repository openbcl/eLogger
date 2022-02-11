import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, take } from "rxjs";
import { LogTemplate } from "../models";
import { compareEventTemplates } from "./helper";

export class EventTypeIsUnique {
    static key = 'eventTypeIsUnique';
    static errors = () => {
        const errors: ValidationErrors = {};
        errors[this.key] = true;
        return errors;
    }
}

export class AppValidators {
    static eventTypeIsUnique = (logTemplate$: Observable<LogTemplate>): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => logTemplate$.pipe(
            take(1),
            map(logTemplate => !logTemplate.eventTemplates?.find(eventTemplate =>
                compareEventTemplates(eventTemplate, control.value)) ? null : EventTypeIsUnique.errors()
            )
        )
    }
}
