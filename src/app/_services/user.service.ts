import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PassDataService} from './pass-data.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }


  getQandA() {
    return this.http.get('http://localhost:8000/question/').toPromise().then(this.sendQuestionnaire).catch(this.handleGetError);
  }

  sendQuestionnaire(res: Response) {
    return res;
  }

  handleGetError(error: Response | any) {
    console.error(error.message || error);
  }

  registerUserAndPass(user) {
    return this.http.post('http://localhost:4200/users/registerUandP', user);
  }

  registerAnswers(finalResponse) {
    return this.http.post('http://localhost:8000/cnp/new/', finalResponse);
  }

  delete(id) {
    return this.http.delete('http://localhost:4200/u/users/${id}');
  }
}

