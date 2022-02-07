import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, from, map, take, toArray } from 'rxjs';
import { Log, LOGS } from '../models';
import { processResult } from '../utils/errorHandler';
import { orderedLogs, reorderLogs } from '../utils/helper';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private db: NgxIndexedDBService) { }
  
  createLog(value: Log) {
    return this.db.add(LOGS, value);
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
        )) : this.db.deleteByKey(LOGS, value.key).pipe(map(deleted => processResult(deleted, value, '')));
    this.db.getByIndex<Log>(LOGS, 'prev', value.id)
      .pipe(take(1)).subscribe(next => this.updateLog({ ...next, prev: value.prev })
        .pipe(take(1)).subscribe());
    return result;
  }

  reorderLogs(values: Log[]) {
    return from(reorderLogs(values)).pipe(concatMap(newOrderedValue => this.updateLog(newOrderedValue)), toArray())
  }
}
