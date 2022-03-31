import { Injectable } from '@angular/core';
import { Key, NgxIndexedDBService } from 'ngx-indexed-db';
import { map, exhaustMap, of, throwError, catchError } from 'rxjs';
import { EventTemplate, EventType, Record, RECORDS } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private db: NgxIndexedDBService) { }
  
  createRecord(eventTemplate: EventTemplate, logId: string, date: Date, data?: string) {
    const value = new Record(eventTemplate, logId, date);
    if (!!data?.length && [EventType.TEXT, EventType.PHOTO, EventType.AUDIO].includes(eventTemplate.eventType)) {
      value.data = data;
    }
    return this.db.add(RECORDS, value);
  }

  loadRecords(logId: string) {
    return this.db.getAllByIndex<Record>(RECORDS, 'logId', IDBKeyRange.only(logId));
  }

  loadAllRecords() {
    return this.db.getAll<Record>(RECORDS);
  }

  countTotalRecords() {
    return this.db.count(RECORDS);
  }

  revokeRecord(logId: string) {
    return this.loadRecords(logId).pipe(
      exhaustMap(records => !!records?.length ? this.db.deleteByKey(RECORDS, records[records.length - 1].key).pipe(
        exhaustMap(result => result ? of(logId) : throwError(() => ({ error: `Could not revoke last record of logId ${logId}.` })))
      ) : of(logId))
    )
  }

  deleteRecords(logId: string) {
    return this.loadRecords(logId).pipe(
      exhaustMap(records => this.db.bulkDelete(RECORDS, records.map<Key>(r => r.key))),
      map(() => logId),
      catchError(() => logId)
    )
  }

}
