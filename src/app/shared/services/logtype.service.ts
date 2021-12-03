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

  add(value: LogType) {
    return this.db.add(LOGTYPES, value);
  }

  update(value: LogType) {
      value.revision = new Date();
      return !value.key ?
        this.getById(value.id).pipe(concatMap(result => 
          this.db.updateByKey<LogType>(LOGTYPES, value, result.key!)
        )) : this.db.updateByKey<LogType>(LOGTYPES, value, value.key)
  }

  getAll() {
    return this.db.getAll<LogType>(LOGTYPES);
  }

  getById(id: string) {
    return this.db.getByIndex<LogType>(LOGTYPES, 'id', id);
  }

  delete(value: LogType) {
    return !value.key ?
        this.getById(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGTYPES, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
        )) : this.db.deleteByKey(LOGTYPES, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }

}
