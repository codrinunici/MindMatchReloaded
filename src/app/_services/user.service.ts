import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>('http://localhost:4200/users');
  }

  register(user) {
    return this.http.post('http://localhost:4200/users/register', user);
  }

  delete(id) {
    return this.http.delete('http://localhost:4200/u/users/${id}');
  }
}

