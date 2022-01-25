import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, map } from 'rxjs';
import { LogType, LOGTYPES } from '../models';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class LogTypeService {

  constructor(private db: NgxIndexedDBService) { }

  createLogType(title: string, desc?: string) {
    return this.db.add(LOGTYPES, new LogType(title, desc));
  }

  updateLogType(value: LogType) {
    return (!value.key ?
      this.loadLogType(value.id).pipe(concatMap(result => 
        this.db.update<LogType>(LOGTYPES, { ...value, revision: new Date(), key: result.key })
      )) : this.db.update<LogType>(LOGTYPES, { ...value, revision: new Date() })).pipe(map(result => result[0]))
  }

  loadLogTypes() {
    return this.db.getAll<LogType>(LOGTYPES);
  }

  loadLogType(id: string) {
    return this.db.getByIndex<LogType>(LOGTYPES, 'id', id);
  }

  deleteLogType(value: LogType) {
    return !value.key ?
        this.loadLogType(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGTYPES, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
        )) : this.db.deleteByKey(LOGTYPES, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }

}
