import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { DivcontrolComponent } from './divcontrol/divcontrol.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatcherComponent,
    ProfileComponent,
    RegisterComponent,
    DivcontrolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
