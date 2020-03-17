import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import {WorkoutComponent} from '../workout/workout.component';
import {MyprofileComponent} from '../myprofile/myprofile.component';
import {SearchComponent} from '../search/search.component';
import {AboutComponent} from '../about/about.component';
import {AppComponent} from '../app.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {RecoverPasswordComponent} from '../recover-password/recover-password.component';
import {UserMainViewComponent} from '../user-main-view/user-main-view.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserMainViewComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'myprofile', component: MyprofileComponent},
      {path: 'search', component: SearchComponent},
      {path: 'workout', component: WorkoutComponent }
    ]},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
