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
  workoutIsEmpty = false; // they show whether the relevant list with the results is empty or not and 
  placeIsEmpty = false; // in this way it doesn't add an empty card in favorites
  jsonData; // it contains a json with the current user which has been saved in session storage after log in
  CurrentTime: any;
  user; // it contains the email of the current logged in user

  constructor(public sanitizer: DomSanitizer, private dashboardService: DashboardService) {
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    }, 1);

  }

  today: number = Date.now(); //gets the current date



  ngOnInit(): void {
    this.jsonData = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = { "email": this.jsonData.email };
    this.dashboardService.getFavoriteWorkout(this.user).subscribe(data => {
      this.favoriteWorkoutResults = data.workoutList;
      if (this.favoriteWorkoutResults.length == 0) { //check if the list with the results is empty or not
        this.workoutIsEmpty = true;                  
      }
    });
    this.dashboardService.getFavoritePlaces(this.user).subscribe(data => {
      this.favoritePlacesResults = data.businessList;
      if (this.favoritePlacesResults.length == 0) { //check if the list with the results is empty or not
        this.placeIsEmpty = true;
      }
    });
  }

}
