import { Component, Input, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  filtersClicked = true; //show filters 
  searchClicked = false;
  isClicked = false;


  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {

  }
  getResults() {
    this.isClicked = true;
  }
  onToggleSidenav() {
    if (document.getElementById('filtersButton').innerText === 'Show Filters') {
      document.getElementById('filtersButton').innerText = 'Hide Filters';
    } else {
      document.getElementById('filtersButton').innerText = 'Show Filters';
    }
  }
}

