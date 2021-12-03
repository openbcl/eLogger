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
  
  createLog(value: Log) {
    return this.db.add(LOGS, value);
  }

  updateLog(value: Log) {
      return !value.key ?
        this.loadLog(value.id).pipe(concatMap(result => 
          this.db.updateByKey<Log>(LOGS, value, result.key!)
        )) : this.db.updateByKey<Log>(LOGS, value, value.key)
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
        )) : this.db.deleteByKey(LOGS, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }
}
