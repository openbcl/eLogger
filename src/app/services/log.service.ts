import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, from, map, exhaustMap, take, toArray, switchMap, forkJoin } from 'rxjs';
import { isBaseLogTitleEqual, orderedLogs, reorderLogs, uniqueBaseLog } from '../utils/lib';
import { Log, LOGS } from '../models';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private db: NgxIndexedDBService) { }
  
  createLog(templateId: string, title: string, desc: string) {
    const value = new Log(templateId, title, desc);
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

  patchLogs(values: Partial<Log>[]) {
    return this.loadLogs().pipe(switchMap(logs => forkJoin(values.map(partialValue => {
      const value: Log = {
        ...partialValue,
        recordsCount: 0,
        prev: partialValue.prev || null,
        desc: partialValue.desc || null
      } as Log;
      const metaEqual = !!logs.find(log => log.id !== value.id && log.desc === value.desc && isBaseLogTitleEqual(log.title, value.title));
      const idEqual = !!logs.find(log => log.id === value.id);
      return metaEqual ? (idEqual ?
          this.updateLog({
            ...uniqueBaseLog<Log>(value, logs),
            recordsCount: logs.find(log => log.id === value.id).recordsCount
          }) :
          this.db.add(LOGS, uniqueBaseLog<Log>(value, logs))
      ) : (idEqual ?
        this.updateLog({
          ...value,
          recordsCount: logs.find(log => log.id === value.id).recordsCount
        }) :
        this.db.add(LOGS, value)
      )
    }))));
  }

  loadLogs() {
    return this.db.getAll<Log>(LOGS).pipe(map(values => orderedLogs(values)));
  }

  loadLog(id: string) {
    return this.db.getByIndex<Log>(LOGS, 'id', id).pipe(map(log => processResult(!!log, log, 'Log does not exist.')));
  }

  deleteLog(value: Log) {
    const errorMsg = 'Could not delete log.';
    const result = !value.key ?
        this.loadLog(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGS, result.key!).pipe(map(deleted => processResult(deleted, value, errorMsg)))
        )) :this.db.deleteByKey(LOGS, value.key).pipe(map(deleted => processResult(deleted, value, errorMsg)));
    return this.db.getByIndex<Log>(LOGS, 'prev', value.id).pipe(
      take(1),
      concatMap(next => !!next ? this.updateLog({ ...next, prev: value.prev }).pipe(exhaustMap(() => result)) : result)
    );
  }

  reorderLogs(values: Log[]) {
    return from(reorderLogs(values)).pipe(concatMap(newOrderedValue => this.updateLog(newOrderedValue)), toArray())
  }

}
