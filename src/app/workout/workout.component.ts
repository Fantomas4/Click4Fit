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
  categoriesFilters: string[] = ['Legs', 'Back', 'Chest', 'Shoulders', 'Biceps', 'Triceps', 'Abs', 'Core'];
  advisedForFilters: string[] = ['Women', 'Men'];
  difficultyFilters: string[] = ['Easy', 'Medium', 'Hard'];
  selectedGroups = []; // they contain values of each selection list
  selectedAdvisedFor = [];
  selectedDifficulty = [];
  selectedEquipment = [];

  equipmentFilters: {
    name: string;
    value: boolean;
  }[] = [
    {
      name: 'Yes',
      value: true
    },
    {
      name: 'No',
      value: false
    },
  ];

  workoutResults: WorkoutEntry[] = [];


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

    this.getResults();
  }

  prepareRequest() {
    return {
      category: this.selectedGroups.map(item => item.toLowerCase()),
      advisedFor: this.selectedAdvisedFor.map(item => item.toLowerCase()),
      difficulty: this.selectedDifficulty.map(item => item.toLowerCase()),
      equipment: this.selectedEquipment
    };
  }

  getResults() {
    // Clear any existing results
    this.workoutResults = [];

    // Clear any existing error messages
    this.alertService.clearMessage();

    this.workoutService.getResults(this.prepareRequest()).subscribe(
      res => {
        this.workoutResults = res.body.workoutList;
        this.alertService.success('Found ' + res.body.workoutList.length + ' workouts');
      },

      error => {
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof (error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
      });
  }

  onToggleSidenav() {
    if (document.getElementById('filters-button').innerText === 'Show Filters') {
      document.getElementById('filters-button').innerText = 'Hide Filters';
    } else {
      document.getElementById('filters-button').innerText = 'Show Filters';
      // Sidenav closes, so we apply the filters and automatically fetch new results
      this.getResults();
    }
  }
}

