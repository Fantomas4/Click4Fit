import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {FavoritesEntry1, FavoritesEntry2} from '../favorite-entry';
import {DashboardService} from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  FavoritesWorkoutResults: FavoritesEntry1[];
  FavoritesPlaceResults: FavoritesEntry2[];
  workoutIsEmpty = false;
  placeIsEmpty = false;
  cardImagePath: string;

  constructor(public sanitizer: DomSanitizer, private dashboardService: DashboardService) {
  }

  today: number = Date.now();


  ngOnInit(): void {
    this.dashboardService.getFAVWResults().subscribe(results => this.FavoritesWorkoutResults = results);
    this.dashboardService.getFAVPResults().subscribe(results => this.FavoritesPlaceResults = results);
    if (this.FavoritesWorkoutResults.length == 0) {
      this.workoutIsEmpty = true;
    }

    if (this.FavoritesPlaceResults.length == 0) {
      this.placeIsEmpty = true;
    }
  }




}
