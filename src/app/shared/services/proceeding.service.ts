import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap } from 'rxjs';
import { Proceeding, PROCEEDINGS } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProceedingService {

  constructor(private db: NgxIndexedDBService) { }
  
  add(value: Proceeding) {
    return this.db.add(PROCEEDINGS, value);
  }

  update(value: Proceeding) {
      return !value.key ?
        this.getById(value.id).pipe(concatMap(result => 
          this.db.updateByKey<Proceeding>(PROCEEDINGS, value, result.key!)
        )) : this.db.updateByKey<Proceeding>(PROCEEDINGS, value, value.key)
  }

  getAll() {
    return this.db.getAll<Proceeding>(PROCEEDINGS);
  }

  getById(id: string) {
    return this.db.getByIndex<Proceeding>(PROCEEDINGS, 'id', id);
  }
}
