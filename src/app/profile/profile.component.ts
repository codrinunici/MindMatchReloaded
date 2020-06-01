import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService, UserService} from '../_services/exporter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PassDataService} from '../_services/pass-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser;
  randomFunToBeSent: string;
  descriptionToBeSent: string;
  editable = false;
  receivedId = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private credentialSender: PassDataService,
    private userService: UserService
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    this.credentialSender.currentId.subscribe(id => this.receivedId = id);
  }

  ngOnInit() {
    // TODO: change current user with user from url. Request user from backend
    this.authenticationService.currentUser
      .subscribe(u => this.currentUser = u);

    this.profileForm = this.formBuilder.group({
      username: [this.currentUser.username, Validators.required],
      randomFun: [''],
      description: [''],
      contact: ['']
    });
  }

  onSubmit() {
    this.randomFunToBeSent = this.profileForm.value.randomFun;
    this.descriptionToBeSent = this.profileForm.value.description;
    this.editable = false;
    this.userService.registerProfileEdits({
      userid: this.receivedId,
      description: this.descriptionToBeSent,
      random_fun: this.randomFunToBeSent
    });
  }


  onEdit() {
    console.log('edit');
    this.editable = true;
  }
}
