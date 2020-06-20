import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { ResultCard2Service } from './result-card2/result-card2.service';
import { Router } from '@angular/router';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';

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
  isClicked = false;
  results: any;  //it contains the results from the request to API 
  categoriesFilters: string[] = ['legs', 'back', 'chest', 'shoulders', 'biceps', 'tricpes', 'abs', 'core'];
  advisedForFilters: string[] = ['women', 'men'];
  difficultyFilters: string[] = ['easy', 'medium', 'hard'];
  equipmentFilters: string[] = ['yes', 'no'];
  selectedCategories = []; //they contain values of each selection list
  selectedAdvisedFor = [];
  selectedDifficulty = [];
  selectedEquipment = [];
  selectedOptionsCategories: any; //they contain the choices of user 
  selectedOptionsAdvisedFor: any;
  selectedOptionsDifficulty: any;
  selectedOptionsEquipment: any;

  constructor(private workoutService: WorkoutService, private resultCardService: ResultCard2Service,
    private router: Router, private alertService: AlertService) { }

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

  /* In the case of clicking search button */
  getResults() {
    this.isClicked = true;
    if (this.selectedOptionsAdvisedFor == null && this.selectedOptionsCategories == null && this.selectedOptionsDifficulty == null && this.selectedOptionsEquipment == null) {
      this.workoutService.getAllWorkout().toPromise().then(data => {
        this.results = data.data;
      },
        error => {
          this.alertService.error(error);
        })
    }
    else {
      if (this.selectedOptionsEquipment != null) {
        for (var i = 0; i < this.selectedOptionsEquipment.length; i++) {
          if (this.selectedOptionsEquipment[i] == 'yes') {
            this.selectedOptionsEquipment = true;
          }
          else {
            this.selectedOptionsEquipment = false;
          }
        }
      }
      else {
        this.selectedOptionsEquipment = [true, false];
      }
      var content = { "category": this.selectedOptionsCategories, "advisedFor": this.selectedOptionsAdvisedFor, "difficulty": this.selectedOptionsDifficulty, "equipment": this.selectedOptionsEquipment };
      this.workoutService.getResults(content).toPromise().then(data => {
        this.results = data.workoutList;
      },
        error => {
          this.alertService.error(error);
        })
    }
  }

  /* When the user clicks on Show Filters, the button changes to Hide Filters and the opposite*/
  onToggleSidenav() {
    if (document.getElementById('filtersButton').innerText === 'Show Filters') {
      document.getElementById('filtersButton').innerText = 'Hide Filters';
    } else {
      document.getElementById('filtersButton').innerText = 'Show Filters';
    }
  }
  /*Each method gets the current click event which shows the choise of user
   and saves it in the suitable variable */
  onNgModelChangeCategories($event) {
    this.selectedOptionsCategories = $event;
  }
  onNgModelChangeAdvisedFor($event) {
    this.selectedOptionsAdvisedFor = $event;
  }
  onNgModelChangeDifficulty($event) {
    this.selectedOptionsDifficulty = $event;
  }
  onNgModelChangeEquipment($event) {
    this.selectedOptionsEquipment = $event;
    console.log(this.selectedOptionsEquipment);
  }
}

