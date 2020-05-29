import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PassDataService {

  private usernameSource = new BehaviorSubject('default username');
  private passSource = new BehaviorSubject('default pass');
  private questionnaireSource = new BehaviorSubject({});
  currentUsername = this.usernameSource.asObservable();
  currentPass = this.passSource.asObservable();
  currentQuestionnaire = this.questionnaireSource.asObservable();

  constructor() {
  }

  changeUsername(user: string) {
    this.usernameSource.next(user);
  }

  changePass(pass: string) {
    this.passSource.next(pass);
  }

  changeQuestionnaire(questionnaire) {
    this.questionnaireSource.next(questionnaire);
  }

}
