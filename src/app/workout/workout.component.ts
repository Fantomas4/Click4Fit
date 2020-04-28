import { Component, Input, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import {ResultCard2Service} from './result-card2/result-card2.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  isClicked = false;
  results;

  constructor(private workoutService: WorkoutService,private resultCardService: ResultCard2Service) { }

  ngOnInit(): void {

  }
  /* In the case of clicking search button */
  getResults() {
    this.isClicked = true;
    var content={categories:['legs','chest'],advisedFor:'women',level:'easy',equipment:'no'}
    this.workoutService.postFilters(content).toPromise().then((data:any)=>{
      this.results=data;
      this.resultCardService.getResults(this.results);
    });
   
  }
  /* When the user clicks on Show Filters, the button changes to Hide Filters and the opposite*/
  onToggleSidenav() {
    if (document.getElementById('filtersButton').innerText === 'Show Filters') {
      document.getElementById('filtersButton').innerText = 'Hide Filters';
    } else {
      document.getElementById('filtersButton').innerText = 'Show Filters';
    }
  }
}

