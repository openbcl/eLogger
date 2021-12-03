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
  
  add(value: Log) {
    return this.db.add(LOGS, value);
  }

  update(value: Log) {
      return !value.key ?
        this.getById(value.id).pipe(concatMap(result => 
          this.db.updateByKey<Log>(LOGS, value, result.key!)
        )) : this.db.updateByKey<Log>(LOGS, value, value.key)
  }

  getAll() {
    return this.db.getAll<Log>(LOGS);
  }

  getById(id: string) {
    return this.db.getByIndex<Log>(LOGS, 'id', id);
  }

  delete(value: Log) {
    return !value.key ?
        this.getById(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGS, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
        )) : this.db.deleteByKey(LOGS, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }
}
