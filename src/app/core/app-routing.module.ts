import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import {WorkoutComponent} from '../workout/workout.component';
import {MyprofileComponent} from '../myprofile/myprofile.component';
import {SearchComponent} from '../search/search.component';
import {AboutComponent} from '../about/about.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {RecoverPasswordComponent} from '../recover-password/recover-password.component';
import {UserMainViewComponent} from '../user-main-view/user-main-view.component';
import {ContactUsComponent} from '../contact-us/contact-us.component';
import {HomeComponent} from '../home/home.component';
import {ManageBusinessEntriesComponent} from '../manage-business-entries/manage-business-entries.component';
import {ManageUserEntriesComponent} from '../manage-user-entries/manage-user-entries.component';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserMainViewComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'dashboard', component: DashboardComponent},
      {path: 'myprofile', component: MyprofileComponent},
      {path: 'search', component: SearchComponent},
      {path: 'workout', component: WorkoutComponent }
    ]},
  {path: 'admin', component: UserMainViewComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'manage-user-entries', pathMatch: 'full' },
      { path: 'manage-user-entries', component: ManageUserEntriesComponent },
      { path: 'manage-business-entries', component: ManageBusinessEntriesComponent},
    ]},
  {path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '' } // If any other path is given, redirect to '' (home)
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
