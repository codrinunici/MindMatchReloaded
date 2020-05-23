import {Routes,} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_helpers/exporter';
import {RegisterUserAndPassComponent} from './registeruserandpass/register-user-and-pass.component';
import {RegisterQuestionsComponent} from './register/register-questions.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterUserAndPassComponent},
  {path: 'register-questions', component: RegisterQuestionsComponent},
  {path: '**', redirectTo: ''}
];

