import { Component, Input, OnInit } from '@angular/core';
import {WorkoutService} from './workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  filtersClicked=false; //hide filters 
  searchClicked=false;
  isClicked=false;

  
  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    
  }
  getResults(){
    this.isClicked=true;
  }
  onClick(){
    if (this.searchClicked==false){
      this.searchClicked=true;
    }
    if (this.filtersClicked==false ){
      document.getElementById("filtersButton").innerText="Show filters";
      this.filtersClicked=true;
    }
    else if (this.filtersClicked==true || this.searchClicked==true) {
      document.getElementById("filtersButton").innerText="Hide filters";
      this.filtersClicked=false;
      this.searchClicked=false;
    }
  }
 
}
