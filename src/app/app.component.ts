import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './_services/exporter';
import {UserService} from './_services/user.service';
import {PassDataService} from './_services/pass-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialSender: PassDataService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  reload() {
    window.open('profile/' + this.currentUser['id'], '_self');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
