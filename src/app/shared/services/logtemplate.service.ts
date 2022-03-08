import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, forkJoin, map, switchMap } from 'rxjs';
import { LogTemplate, LOGTEMPLATES } from '../models';
import { processResult } from '../utils/errorHandler';
import { isBaseLogTitleEqual, uniqueBaseLog } from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class LogTemplateService {

  constructor(private db: NgxIndexedDBService) { }

  createLogTemplate(title: string, desc: string) {
    return this.db.add(LOGTEMPLATES, new LogTemplate(title, desc));
  }

  updateLogTemplate(value: LogTemplate, newRevision = false) {
    return (!value.key ?
      this.loadLogTemplate(value.id).pipe(concatMap(result => 
        this.db.update<LogTemplate>(LOGTEMPLATES, { ...value, revision: newRevision ? new Date() : value.revision, key: result.key })
      )) : this.db.update<LogTemplate>(LOGTEMPLATES, { ...value, revision: newRevision ? new Date() : value.revision }))
      .pipe(map(data => data.find(item => !value.key ? item.id === value.id : item.key === value.key)))
  }

  patchLogTemplates(values: Partial<LogTemplate>[]) {
    return this.loadLogTemplates().pipe(switchMap(logTemplates => forkJoin(values.map(partialValue => {
      const value: LogTemplate = {
        ...partialValue,
        eventTemplates: partialValue.eventTemplates?.map(eventTemplate => ({ ...eventTemplate, color: eventTemplate.color || null })) || [],
        desc: partialValue.desc || null
      } as LogTemplate;
      const metaEqual = !!logTemplates.find(logTemplate => logTemplate.id !== value.id && logTemplate.desc === value.desc && isBaseLogTitleEqual(logTemplate.title, value.title));
      const idEqual = !!logTemplates.find(logTemplate => logTemplate.id === value.id);
      return metaEqual ? (idEqual ?
          this.updateLogTemplate(uniqueBaseLog<LogTemplate>(value, logTemplates), false) :
          this.db.add(LOGTEMPLATES, uniqueBaseLog<LogTemplate>(value, logTemplates))
      ) : (idEqual ?
        this.updateLogTemplate(value, false) :
        this.db.add(LOGTEMPLATES, value)
      )
    }))));
  }

  loadLogTemplates() {
    return this.db.getAll<LogTemplate>(LOGTEMPLATES);
  }

  loadLogTemplate(id: string) {
    return this.db.getByIndex<LogTemplate>(LOGTEMPLATES, 'id', id);
  }

  deleteLogTemplate(value: LogTemplate) {
    return !value.key ? this.loadLogTemplate(value.id).pipe(concatMap(result => 
      this.db.deleteByKey(LOGTEMPLATES, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
    )) : this.db.deleteByKey(LOGTEMPLATES, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }

}
