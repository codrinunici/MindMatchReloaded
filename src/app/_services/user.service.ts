import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PassDataService} from './pass-data.service';
import {Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpOptions: any;
  idToBeSent: string;

  constructor(private http: HttpClient, private credentialSender: PassDataService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.credentialSender.currentId.subscribe(message => this.idToBeSent = message);
  }


  getQandA() {
    return this.http.get('http://localhost:8000/question/').toPromise().then(this.sendQuestionnaire).catch(this.handleGetError);
  }

  sendQuestionnaire(res: Response) {
    return res;
  }

  registerUserAndPass(user) {
    return this.http.post('http://localhost:8000/users/new/', user).pipe(first()).subscribe(
      data => {
        this.getNewId(data['id']);
      }
    ); // change to new page of backend
  }

  getNewId(id: number) {
    this.idToBeSent = String(id);
    this.credentialSender.changeId(this.idToBeSent);
  }

  registerAnswers(finalResponse) {
    return this.http.post('http://localhost:8000/cnp/new/', finalResponse);
  }

  registerProfileEdits(newEdits) {
    return this.http.put('http://localhost:8000/profile/' + newEdits.userid + '/', newEdits).pipe(first()).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  handleGetError(error: Response | any) {
    console.error(error.message || error);
  }
}

