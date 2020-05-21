import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { DivcontrolComponent } from './divcontrol/divcontrol.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing.module';
import {fakeBackendProvider, JwtInterceptor} from './_helpers/exporter';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './_helpers/error.interceptor'; // ?

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatcherComponent,
    ProfileComponent,
    RegisterComponent,
    DivcontrolComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
