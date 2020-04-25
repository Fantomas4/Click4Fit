import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {FavoriteWorkout, FavoritePlace} from '../favorite-entry';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  FavoritesWorkoutResults: FavoriteWorkout[];
  FavoritesPlaceResults: FavoritePlace[];
  workoutIsEmpty = false;
  placeIsEmpty = false;
  cardImagePath: string;

  constructor(public sanitizer: DomSanitizer, private dashboardService: DashboardService) {
  }

  today: number = Date.now(); //gets the current date


  ngOnInit(): void {
    //gets the favrorites workout results from dashboard.service and adds them to an array
    this.dashboardService.getFAVWResults().subscribe(results => this.FavoritesWorkoutResults = results);
    //gets the favorites places results from dashboard.service and adds them to an array
    this.dashboardService.getFAVPResults().subscribe(results => this.FavoritesPlaceResults = results);
    //in the case of zero favorites results
    if (this.FavoritesWorkoutResults.length == 0) {
      this.workoutIsEmpty = true;
    }
    if (this.FavoritesPlaceResults.length == 0) {
      this.placeIsEmpty = true;
    }
  }


}
