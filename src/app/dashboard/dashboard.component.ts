import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FavoriteWorkout, FavoritePlace } from '../favorite-entry';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  favoriteWorkoutResults = [];
  favoritePlacesResults = [];
  workoutIsEmpty = false;
  placeIsEmpty = false;
  jsonData;
  CurrentTime: any;
  user;

  constructor(public sanitizer: DomSanitizer, private dashboardService: DashboardService) {
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ' ' + ':' + ' ' + new Date().getMinutes(); }, 1);
  }

  today: number = Date.now(); //gets the current date



  ngOnInit(): void {
    this.jsonData=JSON.parse(sessionStorage.getItem('currentUser'));
    this.user={"email":this.jsonData.email};
    this.dashboardService.getFavoriteWorkout(this.user).subscribe(data => {
      this.favoriteWorkoutResults = data.workoutList;
      if (this.favoriteWorkoutResults.length == 0) {
        this.workoutIsEmpty = true;
      }
    },
    error=>{
    });
    this.dashboardService.getFavoritePlaces(this.user).subscribe(data => {
      this.favoritePlacesResults = data.businessList;
      if (this.favoritePlacesResults.length == 0) {
        this.placeIsEmpty = true;
      }
    },
    error=>{
    });
    //gets the favrorites workout results from dashboard.service and adds them to an array
    //this.dashboardService.getFAVWResults().subscribe(results => this.FavoritesWorkoutResults = results);
    //gets the favorites places results from dashboard.service and adds them to an array
    //this.dashboardService.getFAVPResults().subscribe(results => this.FavoritesPlaceResults = results);
    //in the case of zero favorites results
  }


}
