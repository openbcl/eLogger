import { createAction, props } from '@ngrx/store';
import { EventTemplate } from '../../shared/models';

export const createRecord = createAction(
    '[Record] Create Record',
    props<{ eventTemplate: EventTemplate, logId: string, text?: string }>()
);

export const createRecordFailure = createAction(
    '[Record] Create Record Failure',
    props<{ error: any }>()
);

export const revokeRecord = createAction(
    '[Record] Revoke Record',
    props<{ logId: string }>()
);

export const revokeRecordFailure = createAction(
    '[Record] Revoke Record Failure',
    props<{ error: any }>()
);

export const deleteRecords = createAction(
    '[Record] Delete Records',
    props<{ logId: string }>()
);

export const deleteRecordsFailure = createAction(
    '[Record] Delete Records Failure',
    props<{ error: any }>()
);