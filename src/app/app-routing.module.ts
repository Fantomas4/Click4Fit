import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {WorkoutComponent} from './workout/workout.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path: '', component: AppComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/overview', component: OverviewComponent},
  {path: 'dashboard/workout', component: WorkoutComponent },
  {path: 'dashboard/myprofile', component: MyprofileComponent},
  {path: 'dashboard/search', component: SearchComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
