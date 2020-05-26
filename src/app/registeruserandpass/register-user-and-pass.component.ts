import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';
import {PassDataService} from '../_services/pass-data.service';

@Component({
  selector: 'app-register-user-and-pass',
  templateUrl: './register-user-and-pass.component.html',
  styleUrls: ['./register-user-and-pass.component.css']
})
export class RegisterUserAndPassComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  usernameToBeSent: string;
  passwordToBeSent: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private credentialSender: PassDataService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.credentialSender.currentUsername.subscribe(message => this.usernameToBeSent = message);
    this.credentialSender.currentPass.subscribe(message => this.passwordToBeSent = message);
  }

  get f() {
    return this.registerForm.controls;
  }


  // storeUserAndPass() {
  //
  //   this.usernameToBeSent = this.registerForm.value['username'];
  //   this.passwordToBeSent = this.registerForm.value['password'];
  //   this.credentialSender.changeUsername(this.usernameToBeSent);
  //   this.credentialSender.changePass(this.passwordToBeSent);
  // }

  onSubmit() {
    this.usernameToBeSent = this.registerForm.value['username'];
    this.passwordToBeSent = this.registerForm.value['password'];
    this.credentialSender.changeUsername(this.usernameToBeSent);
    this.credentialSender.changePass(this.passwordToBeSent);
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.router.navigate(['/register-questions']);
    }
  }
}
