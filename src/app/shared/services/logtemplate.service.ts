import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, map } from 'rxjs';
import { LogTemplate, LOGTEMPLATES } from '../models';
import { processResult } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class LogTemplateService {

  constructor(private db: NgxIndexedDBService) { }

  createLogTemplate(title: string, desc?: string) {
    return this.db.add(LOGTEMPLATES, new LogTemplate(title, desc));
  }

  updateLogTemplate(value: LogTemplate) {
    return (!value.key ?
      this.loadLogTemplate(value.id).pipe(concatMap(result => 
        this.db.update<LogTemplate>(LOGTEMPLATES, { ...value, revision: new Date(), key: result.key })
      )) : this.db.update<LogTemplate>(LOGTEMPLATES, { ...value, revision: new Date() }))
      .pipe(map(data => data.find(item => !value.key ? item.id === value.id : item.key === value.key)))
  }

  loadLogTemplates() {
    return this.db.getAll<LogTemplate>(LOGTEMPLATES);
  }

  loadLogTemplate(id: string) {
    return this.db.getByIndex<LogTemplate>(LOGTEMPLATES, 'id', id);
  }

  deleteLogTemplate(value: LogTemplate) {
    return !value.key ?
        this.loadLogTemplate(value.id).pipe(concatMap(result => 
          this.db.deleteByKey(LOGTEMPLATES, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
        )) : this.db.deleteByKey(LOGTEMPLATES, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }

}
