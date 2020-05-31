import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PassDataService {

  private idSource = new BehaviorSubject('default id');
  currentId = this.idSource.asObservable();

  constructor() {
  }

  changeId(newId: string) {
    this.idSource.next(newId);
  }

}
