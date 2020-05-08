import { Component, Input, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  isClicked = false;
  selectionArray = new Array();


  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {

  }
  /* In the case of clicking search button */
  getResults() {
    this.isClicked = true;
  }
  /* When the user clicks on Show Filters, the button changes to Hide Filters and the opposite*/
  onToggleSidenav() {
    if (document.getElementById('filtersButton').innerText === 'Show Filters') {
      document.getElementById('filtersButton').innerText = 'Hide Filters';
    } else {
      document.getElementById('filtersButton').innerText = 'Show Filters';
    }
  }

  onSelection(e, v) {
    for (const a of v) {
      this.selectionArray.push(a.value);
    }
  }
}

