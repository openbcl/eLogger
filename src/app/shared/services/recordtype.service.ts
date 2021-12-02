import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap } from 'rxjs';
import { RecordType, RECORDTYPES } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RecordTypeService {

  constructor(private db: NgxIndexedDBService) { }

  add(value: RecordType) {
    return this.db.add(RECORDTYPES, value);
  }

  update(value: RecordType) {
      value.revision = new Date();
      return !value.key ?
        this.getById(value.id).pipe(concatMap(result => 
          this.db.updateByKey<RecordType>(RECORDTYPES, value, result.key!)
        )) : this.db.updateByKey<RecordType>(RECORDTYPES, value, value.key)
  }

  getAll() {
    return this.db.getAll<RecordType>(RECORDTYPES);
  }

  getById(id: string) {
    return this.db.getByIndex<RecordType>(RECORDTYPES, 'id', id);
  }

}
