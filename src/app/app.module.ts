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
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
