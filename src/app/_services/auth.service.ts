import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private newUserId: number;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // this will get logged in user from backend
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

   login(user) {
     return this.http.post<any>('http://localhost:8000/users/login/', user)
      .toPromise().then(this.interceptLoginUser).catch(this.handleGetError);
  }

  interceptLoginUser(res: Response | any) {
    return res;
  }

  handleGetError(error: Response | any) {
    console.error(error.message || error);
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
