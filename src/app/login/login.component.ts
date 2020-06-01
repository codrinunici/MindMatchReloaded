import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../_services/exporter';
import {PassDataService} from '../_services/pass-data.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string;
  idToBeSent = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialSender: PassDataService
  ) {
    localStorage.clear();

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.credentialSender.currentId.subscribe(id => this.idToBeSent = id);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = null;
    this.success = null;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login({username: this.f.username.value, password: this.f.password.value, id: ''}).pipe(first()).subscribe(
      data => {
        this.idToBeSent = String(data);
        this.credentialSender.changeId(this.idToBeSent);
        return this.router.navigate(['/']);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
    // .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     });
  }

}
