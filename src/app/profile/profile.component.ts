import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService, UserService } from '../_services/exporter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassDataService } from '../_services/pass-data.service';
import { async } from '@angular/core/testing';
import { promise } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser;
  public description;
  randomFunToBeSent: string;
  descriptionToBeSent: string;
  user;
  editable = false;
  receivedId = '';
  ID;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private credentialSender: PassDataService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.profileForm = this.formBuilder.group({
      username: '',
      randomFun: '',
      description: '',
    });

    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }

    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.ID !== '0') {
      this.receivedId = this.ID;
    } else {
      this.credentialSender.currentId.subscribe(id => this.receivedId = id);
    }

  }

  async ngOnInit() {
    await this.getData();
    this.updateForm();
  }

  async getData() {
    await this.userService.getUserInfo(this.receivedId).toPromise().then(data => {
      this.user = data;
    })
    return Promise;
  }

  updateForm() {
    this.authenticationService.currentUser
      .subscribe(u => this.currentUser = u);
    this.profileForm = this.formBuilder.group({
      username: this.user['username'],
      randomFun: this.user['random_fun'],
      description: this.user['description'],
    });
  }

  onSubmit() {
    if (this.editable) {
      this.randomFunToBeSent = this.profileForm.value.randomFun;
      this.descriptionToBeSent = this.profileForm.value.description;
      this.editable = false;
      this.userService.registerProfileEdits({
        userid: this.receivedId,
        description: this.descriptionToBeSent,
        random_fun: this.randomFunToBeSent
      });
    }
  }


  onEdit() {
    this.editable = true;
  }
}
