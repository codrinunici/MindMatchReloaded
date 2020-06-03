import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../_services/exporter';
import { PassDataService } from '../_services/pass-data.service';

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {
  userMatches = [];
  id;
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.id = this.authService.currentUserValue['id'];
    this.userService.getMatchUsers(this.id).toPromise().then(data => {
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          this.userMatches.push(data[i]);
        }
      }
    });
  }

  onClick(userid) {
    if (this.id > userid) {
      console.log('link' + userid + this.id);
    } else {
      console.log('link' + this.id + userid);
    }
    window.open("http://localhost:8000/users");

  }

}
