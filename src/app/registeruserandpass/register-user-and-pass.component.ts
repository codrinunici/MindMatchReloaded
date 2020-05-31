import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
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
  private newUsername: string;
  private newPass: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient,
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
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.newUsername = this.registerForm.value['username'];
    this.newPass = this.registerForm.value['password'];
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.registerUserAndPass({username: this.newUsername, password: this.newPass, id: ''});
      this.router.navigate(['/register-questions']);
    }
  }
}
