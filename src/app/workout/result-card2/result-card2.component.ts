import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ResultCard2Service } from './result-card2.service';
import {AlertService} from '../../core/alert.service';
import {Subscription} from 'rxjs';
import {AlertMessage} from '../../core/alert-message';


@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {

  @Input() workoutData; // it gets each entry of results

  name: string;
  category: string;
  muscleGroups: [];
  advisedFor: string;
  difficulty: string;
  sets: string;
  videoUrl: string;
  equipment: boolean;
  favorite = false; // it shows if the workout entry has been added in favorites successfully and
  // in this way the empty heart icon changes to full heart icon

  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  // DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer, private workoutCardService: ResultCard2Service, private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });

    // Check favorite status and set the favorite flag accordingly
    this.favorite = JSON.parse(sessionStorage.getItem('currentUser')).favoriteWorkout.includes(this.workoutData._id);

    this.name = this.workoutData.name;
    this.category = this.workoutData.category;
    this.muscleGroups = this.workoutData.muscleGroups;
    this.advisedFor = this.workoutData.advisedFor;
    this.equipment = this.workoutData.equipment;
    this.difficulty = this.workoutData.difficulty.charAt(0).toUpperCase() + this.workoutData.difficulty.slice(1); // Capitalize the first letter
    this.videoUrl = this.workoutData.videoUrl;
    this.sets = this.workoutData.sets;

  }

  /**
   * Called when a user adds or removes favorites from his preferences, in order to update
   * the local storage user data with the latest input from the Data Base.
   */
  updateUserData() {
    const request = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};
    this.workoutCardService.updateUser(request).subscribe(

      data => {
        // @ts-ignore
        const {surname, favoriteWorkout, token, _id, name, email, privilegeLevel, favoriteBusiness} = data.body.user;
        const loggedInUserData = {
          _id,
          name,
          surname,
          email,
          privilegeLevel,
          token,
          favoriteBusiness,
          favoriteWorkout
        };

        sessionStorage.setItem('currentUser', JSON.stringify(loggedInUserData));

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
  }

  onFavoriteClick() {
    const request = {
      user: {
        _id: JSON.parse(sessionStorage.getItem('currentUser'))._id
      },
      favorite_id: this.workoutData._id
    };

    if (!this.favorite) {
      // The card is currently not selected as a user favorite, so the user requested an addition
      this.workoutCardService.addFavoriteWorkout(request).toPromise().then(

        data => {
          this.favorite = true;
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
    } else {
      // The card is currently selected as a user favorite, so the user requested a removal
      this.workoutCardService.removeFavoriteWorkout(request).toPromise().then(

        data => {
          this.favorite = false;
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
    }
    // Update logged in user's data after adding or removing favorites.
    this.updateUserData();
  }
}
