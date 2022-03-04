import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, from, map, exhaustMap, take, toArray } from 'rxjs';
import { orderedLogs, reorderLogs } from '../utils/helper';
import { Log, LOGS } from '../models';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private db: NgxIndexedDBService) { }
  
  createLog(logTemplateId: string, title: string, desc: string) {
    const value = new Log(logTemplateId, title, desc);
    return this.loadLogs().pipe(exhaustMap(logs => {
      if (!!logs?.length) {
        value.prev = logs[logs.length - 1].id;
      }
      return this.db.add(LOGS, value);
    }))
  }

  updateLog(value: Log) {
      return (!value.key ?
        this.loadLog(value.id).pipe(concatMap(result => 
          this.db.update<Log>(LOGS, { ...value, key: result.key})
        )) : this.db.update<Log>(LOGS, value))
      .pipe(map(data => data.find(item => !value.key ? item.id === value.id : item.key === value.key)))
  }

  loadLogs() {
    return this.db.getAll<Log>(LOGS).pipe(map(values => orderedLogs(values)));
  }

  loadLog(id: string) {
    return this.db.getByIndex<Log>(LOGS, 'id', id);
  }

  deleteLog(value: Log) {
    const result = !value.key ?
        this.loadLog(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGS, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
        )) :this.db.deleteByKey(LOGS, value.key).pipe(map(deleted => processResult(deleted, value, '')));
    return this.db.getByIndex<Log>(LOGS, 'prev', value.id).pipe(
      take(1),
      concatMap(next => !!next ? this.updateLog({ ...next, prev: value.prev }).pipe(exhaustMap(() => result)) : result)
    );
  }

  reorderLogs(values: Log[]) {
    return from(reorderLogs(values)).pipe(concatMap(newOrderedValue => this.updateLog(newOrderedValue)), toArray())
  }

}
