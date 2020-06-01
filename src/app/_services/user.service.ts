import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PassDataService} from './pass-data.service';
import {Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpOptions: any;
  idToBeSent: string;
  private newProfileData: any; // used only to retain the new profile data after 404 error is caught in error interceptor.
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
    this.newProfileData = newEdits;
    this.http.get('http://localhost:8000/profile/' + newEdits.userid + '/').
    toPromise().then(this.sendQuestionnaire).catch(this.handleGetError);
    // return this.http.post('http://localhost:8000/profile/new/', newEdits);
  }

// data => {
//   this.updateProfileData(newEdits);
// },
// error => {
//    {
//     this.createNewProfileData(newEdits);
//   }
  updateProfileData() {
    this.http.put('http://localhost:8000/profile/' + this.newProfileData.userid + '/', this.newProfileData);
  }

  createNewProfileData() {
    console.log(this.newProfileData);
    this.http.post('http://localhost:8000/profile/new/', this.newProfileData);
  }


  handleGetError(error: Response | any) {
    if (error.status === 404) {
      if (error.url.search('profile//[0-9]*')) {
        this.createNewProfileData();
      } else {
        this.updateProfileData();
      }
    }
  }
}

