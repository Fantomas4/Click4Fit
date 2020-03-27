import { Component, Input, OnInit } from '@angular/core';
import {WorkoutEntry} from '../workout-entry';
import {WorkoutService} from './workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workoutResults: WorkoutEntry[];
  
  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    
  }
  getResults(){
    this.workoutService.getResults().subscribe(results => this.workoutResults = results);

  }
 
}
