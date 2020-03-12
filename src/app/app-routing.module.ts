import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import {WorkoutComponent} from './workout/workout.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'workout', component:WorkoutComponent },
  {path: 'myprofile', component:MyprofileComponent},
  {path: 'search', component:SearchComponent},
  {path:'about', component:AboutComponent},
  {path:'home', component:AppComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }