import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from './dashboard.service';
import {BusinessEntry} from '../business-entry';
import {WorkoutEntry} from '../manage-workout-entries/workout-entry';
import {Subscription} from 'rxjs';
import {AlertMessage} from '../core/alert-message';
import {AlertService} from '../core/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentTime: any;

  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  placesChecked = true;
  workoutsChecked = true;
  loading = true; // Flag used to determine if the loading of the data is in progress or has finished.
  favoritePlaces: BusinessEntry[] = [];
  favoriteWorkouts: WorkoutEntry[] = [];

  constructor(public sanitizer: DomSanitizer, private dashboardService: DashboardService, private alertService: AlertService) {
    setInterval(() => {
      this.currentTime = Date.now(); // It gets the current time
    }, 1);

  }

  today: number = Date.now(); // It gets the current date

  ngOnInit(): void {
    // Subscribe to the alert service in order to get any alert messages
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });

    this.dashboardService.getFavoritePlaces({_id: JSON.parse(sessionStorage.getItem('currentUser'))._id}).subscribe(
      res => {
        this.favoritePlaces = res.body.businessList;
      },

      error => {
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof(error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
      });

    this.dashboardService.getFavoriteWorkouts({_id: JSON.parse(sessionStorage.getItem('currentUser'))._id}).subscribe(
      res => {
        console.log(res);
        this.favoriteWorkouts = res.body.workoutList;
      },

      error => {
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof(error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
      });

    // Set the loading flag to false after a small delay
    setTimeout(function stopLoading() { this.loading = false; }.bind(this), 1000);
  }
}
