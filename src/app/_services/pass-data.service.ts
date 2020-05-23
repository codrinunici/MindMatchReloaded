import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PassDataService {

  private usernameSource = new BehaviorSubject('default username');
  private passSource = new BehaviorSubject('default pass');
  currentUsername = this.usernameSource.asObservable();
  currentPass = this.passSource.asObservable();

  constructor() { }

  changeUsername(user: string) {
    this.usernameSource.next(user);
  }

  changePass(pass: string) {
    this.passSource.next(pass);
  }

}
