import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService, UserService} from '../_services/exporter';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          this.authenticationService.logout();
          location.reload(true);
        }
        if (err.status === 403 && err.url.search('users/login/')) {
          return throwError('Wrong username or password');
        }

        const error = err.error || err.statusText;
        return throwError(error);
      }
    ));
  }
}
