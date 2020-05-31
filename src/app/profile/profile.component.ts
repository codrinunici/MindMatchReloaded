import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/exporter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser;
  usernameToBeSent: string;
  randomFunToBeSent: string;
  descriptionToBeSent: string;
  contactToBeSent: string;
  editable = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // TODO: change current user with user from url. Request user from backend 
    this.authenticationService.currentUser
      .subscribe(u => this.currentUser = u);

    this.profileForm = this.formBuilder.group({
      username: [this.currentUser.username, Validators.required],
      randomFun: ['', Validators.required],
      description: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  onSubmit() {
    this.usernameToBeSent = this.profileForm.value.username;
    this.randomFunToBeSent = this.profileForm.value.randomFun;
    this.descriptionToBeSent = this.profileForm.value.description;
    this.contactToBeSent = this.profileForm.value.contact;

    this.editable = false;
    // TODO: send update with this values
    console.log(this.usernameToBeSent + ' ' + this.randomFunToBeSent + ' ' + this.descriptionToBeSent + ' ' + this.contactToBeSent);
  }


  onEdit() {
    this.editable = true;
  }
}