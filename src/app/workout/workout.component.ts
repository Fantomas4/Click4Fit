import {Component, OnInit} from '@angular/core';
import {WorkoutService} from './workout.service';
import {ResultCard2Service} from './result-card2/result-card2.service';
import {Router} from '@angular/router';
import {AlertService} from '../core/alert.service';
import {Subscription} from 'rxjs';
import {WorkoutEntry} from '../workout-entry';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  searchClicked = false;
  results: any;  // it contains the results from the request to API
  categoriesFilters: string[] = ['Legs', 'Back', 'Chest', 'Shoulders', 'Biceps', 'Triceps', 'Abs', 'Core'];
  advisedForFilters: string[] = ['Women', 'Men'];
  difficultyFilters: string[] = ['Easy', 'Medium', 'Hard'];
  equipmentFilters: string[] = ['Yes', 'No'];
  selectedGroups = []; // they contain values of each selection list
  selectedAdvisedFor = [];
  selectedDifficulty = [];
  selectedEquipment = [];

  searchResults: WorkoutEntry[] = [];


  constructor(private workoutService: WorkoutService, private resultCardService: ResultCard2Service,
              private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
  }

  /* When the sidenav opens, the button changes to Hide Filters and the opposite */
  onToggleSidenav() {
    if (document.getElementById('filter-button').innerText === 'Show Filters') {
      document.getElementById('filter-button').innerText = 'Hide Filters';
    } else {
      document.getElementById('filter-button').innerText = 'Show Filters';
    }
  }

  onSearch() {
    this.workoutService.getResults({
      category: this.selectedGroups, country: this.locationAutocomplete.getUserCountryChoices(),
      city: this.locationAutocomplete.getUserCityChoices()}).subscribe(
      res => {
        this.searchResults = res.body.data;
      },

      error => {
        this.alertService.error(error);
      });
  }
  // /* In the case of clicking search button */
  // getResults() {
  //   this.searchClicked = true;
  //   let content;
  //   if (this.selectedOptionsAdvisedFor == null && this.selectedOptionsCategories == null && this.selectedOptionsDifficulty == null &&
  //     this.selectedOptionsEquipment == null) {
  //     this.workoutService.getAllWorkout().toPromise().then(data => {
  //         this.results = data.data;
  //       },
  //       error => {
  //         this.alertService.error(error);
  //       });
  //   } else {
  //     if (this.selectedOptionsEquipment != null) {
  //       for (let i = 0; i < this.selectedOptionsEquipment.length; i++) {
  //         if (this.selectedOptionsEquipment[i] === 'yes') {
  //           this.selectedOptionsEquipment = true;
  //         } else {
  //           this.selectedOptionsEquipment = false;
  //         }
  //       }
  //
  //       content = {
  //         category: this.selectedOptionsCategories,
  //         advisedFor: this.selectedOptionsAdvisedFor,
  //         difficulty: this.selectedOptionsDifficulty,
  //         equipment: [this.selectedOptionsEquipment]
  //       };
  //     } else {
  //       this.selectedOptionsEquipment = [true, false];
  //       content = {
  //         category: this.selectedOptionsCategories,
  //         advisedFor: this.selectedOptionsAdvisedFor,
  //         difficulty: this.selectedOptionsDifficulty,
  //         equipment: this.selectedOptionsEquipment
  //       };
  //     }
  //     this.workoutService.getResults(content).toPromise().then(data => {
  //         this.results = data.workoutList;
  //       },
  //       error => {
  //         this.alertService.error(error);
  //       });
  //   }
  // }
  //



}

