import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, map } from 'rxjs';
import { Log, LOGS } from '../models';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private db: NgxIndexedDBService) { }
  
  createLog(logTemplateId: string, title: string, desc?: string) {
    const value = new Log(logTemplateId);
    value.title = title;
    value.desc = desc;
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
    return this.db.getAll<Log>(LOGS);
  }

  loadLog(id: string) {
    return this.db.getByIndex<Log>(LOGS, 'id', id);
  }

  deleteLog(value: Log) {
    return !value.key ?
        this.loadLog(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGS, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
        )) : this.db.deleteByKey(LOGS, value.key).pipe(map(deleted => processResult(deleted, value, '')));
  }

}
