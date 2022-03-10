import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, forkJoin, map, switchMap } from 'rxjs';
import { Template, TEMPLATES } from '../models';
import { processResult } from '../utils/errorHandler';
import { isBaseLogTitleEqual, uniqueBaseLog } from '../utils/lib';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private db: NgxIndexedDBService) { }

  createTemplate(title: string, desc: string) {
    return this.db.add(TEMPLATES, new Template(title, desc));
  }

  updateTemplate(value: Template, newRevision = false) {
    return (!value.key ?
      this.loadTemplate(value.id).pipe(concatMap(result => 
        this.db.update<Template>(TEMPLATES, { ...value, revision: newRevision ? new Date() : value.revision, key: result.key })
      )) : this.db.update<Template>(TEMPLATES, { ...value, revision: newRevision ? new Date() : value.revision }))
      .pipe(map(data => data.find(item => !value.key ? item.id === value.id : item.key === value.key)))
  }

  patchTemplates(values: Partial<Template>[]) {
    return this.loadTemplates().pipe(switchMap(templates => forkJoin(values.map(partialValue => {
      const value: Template = {
        ...partialValue,
        eventTemplates: partialValue.eventTemplates?.map(eventTemplate => ({ ...eventTemplate, color: eventTemplate.color || null })) || [],
        desc: partialValue.desc || null
      } as Template;
      const metaEqual = !!templates.find(template => template.id !== value.id && template.desc === value.desc && isBaseLogTitleEqual(template.title, value.title));
      const idEqual = !!templates.find(template => template.id === value.id);
      return metaEqual ? (idEqual ?
          this.updateTemplate(uniqueBaseLog<Template>(value, templates), false) :
          this.db.add(TEMPLATES, uniqueBaseLog<Template>(value, templates))
      ) : (idEqual ?
        this.updateTemplate(value, false) :
        this.db.add(TEMPLATES, value)
      )
    }))));
  }

  loadTemplates() {
    return this.db.getAll<Template>(TEMPLATES);
  }

  loadTemplate(id: string) {
    return this.db.getByIndex<Template>(TEMPLATES, 'id', id);
  }

  deleteTemplate(value: Template) {
    return !value.key ? this.loadTemplate(value.id).pipe(concatMap(result => 
      this.db.deleteByKey(TEMPLATES, result.key!).pipe(map(deleted => processResult(deleted, value, '')))
    )) : this.db.deleteByKey(TEMPLATES, value.key).pipe(map(deleted => processResult(deleted, value, '')))
  }

}
