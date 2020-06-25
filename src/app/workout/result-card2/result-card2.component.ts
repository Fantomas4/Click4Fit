import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AlertService} from '../../core/alert.service';
import {Subscription} from 'rxjs';
import {AlertMessage} from '../../core/alert-message';
import {UserService} from '../../user.service';


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
  trustedVideoResource: SafeResourceUrl;
  equipment: boolean;
  isFavorite = false; // it shows if the workout entry has been added in favorites successfully and
  // in this way the empty heart icon changes to full heart icon

  loading = false;

  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  // DomSanitizer helps to pass url video safe
  constructor(private sanitizer: DomSanitizer, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.loading = true;

    // Check favorite status and set the favorite flag accordingly
    this.isFavorite = JSON.parse(sessionStorage.getItem('currentUser')).favoriteWorkout.includes(this.workoutData._id);

    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });

    this.name = this.workoutData.name;
    this.category = this.workoutData.category;
    this.muscleGroups = this.workoutData.muscleGroups;
    this.advisedFor = this.workoutData.advisedFor;
    this.equipment = this.workoutData.equipment;
    this.difficulty = this.workoutData.difficulty.charAt(0).toUpperCase() + this.workoutData.difficulty.slice(1); // Capitalize the first letter
    this.trustedVideoResource = this.sanitizer.bypassSecurityTrustResourceUrl(this.workoutData.videoUrl);
    this.sets = this.workoutData.sets;

    // Set the loading flag to false after a small delay
    setTimeout(function stopLoading() { this.loading = false; }.bind(this), 1000);
  }

  onFavoriteClick() {
    this.loading = true;

    const request = {
      user: {
        _id: JSON.parse(sessionStorage.getItem('currentUser'))._id
      },
      favorite_id: this.workoutData._id
    };

    if (!this.isFavorite) {
      // The card is currently not selected as a user favorite, so the user requested an addition
      this.userService.addFavoriteWorkout(request).toPromise().then(

        data => {
          this.isFavorite = true;
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
      this.userService.removeFavoriteWorkout(request).toPromise().then(

        data => {
          this.isFavorite = false;
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

    // Set the loading flag to false after a small delay
    setTimeout(function stopLoading() { this.loading = false; }.bind(this), 1000);
  }
}
