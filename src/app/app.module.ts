import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterQuestionsComponent} from './register/register-questions.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing.module';
import {fakeBackendProvider, JwtInterceptor} from './_helpers/exporter';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ?
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegisterUserAndPassComponent } from './registeruserandpass/register-user-and-pass.component';
import {PassDataService} from './_services/pass-data.service';
import {UserService} from './_services/user.service';
import {AuthenticationService} from './_services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatcherComponent,
    ProfileComponent,
    RegisterQuestionsComponent,
    HomeComponent,
    RegisterUserAndPassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    PassDataService,
    AuthenticationService
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
