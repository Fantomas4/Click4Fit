import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WorkoutService } from './workout.service';
import {ResultCard2Service} from './result-card2/result-card2.service';
import { ResultCard2Component } from './result-card2/result-card2.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  @ViewChild(ResultCard2Component, { static: false }) resultCard: ResultCard2Component;

  isClicked = false;
  results;
  content;
  categories;
  advisedFor;
  level;
  equipment;
  categoriesFilters:string[]=['legs','back','chest','shoulders','biceps','tricpes','abs','core'];
  advisedForFilters:string[]=['women','men'];
  difficultyFilters:string[]=['easy','medium','hard'];
  equipmentFilters:string[]=['yes','no'];
  selectedCategories=[];
  selectedAdvisedFor=[];
  selectedDifficulty=[];
  selectedEquipment=[];
  selectedOptionsCategories;
  selectedOptionsAdvisedFor;
  selectedOptionsDifficulty;
  selectedOptionsEquipment;

  constructor(private workoutService: WorkoutService,private resultCardService: ResultCard2Service) { }

  ngOnInit(): void {

  }
  
  /* In the case of clicking search button */
  getResults() {
    this.isClicked = true;
    this.content={"category":this.selectedOptionsCategories,"advisedFor":this.selectedOptionsAdvisedFor,"difficulty":this.selectedOptionsDifficulty,"equipment": [this.selectedOptionsEquipment]};
    //this.resultCard.ngOnInit();
  }
  
  /* When the user clicks on Show Filters, the button changes to Hide Filters and the opposite*/
  onToggleSidenav() {
    if (document.getElementById('filtersButton').innerText === 'Show Filters') {
      document.getElementById('filtersButton').innerText = 'Hide Filters';
    } else {
      document.getElementById('filtersButton').innerText = 'Show Filters';
    }
  }
  
  onNgModelChangeCategories($event){
    this.selectedOptionsCategories=$event;
  }
  onNgModelChangeAdvisedFor($event){
    this.selectedOptionsAdvisedFor=$event;
  }
  onNgModelChangeDifficulty($event){
    this.selectedOptionsDifficulty=$event;
  }
  onNgModelChangeEquipment($event){
    if ($event=='yes'){
      this.selectedOptionsEquipment=true;
    }
    else{
      this.selectedOptionsEquipment=false;
    }
  }
}

