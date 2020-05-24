import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WorkoutService } from './workout.service';
import {ResultCard2Service} from './result-card2/result-card2.service';
import { ResultCard2Component } from './result-card2/result-card2.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {


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
  search:boolean=false;
  mySubscription;
  legsWorkoutResults=[];
  chestWorkoutResults=[];
  backWorkoutResults=[];
  shouldersWorkoutResults=[];
  bicepsWorkoutResults=[];
  tricepsWorkoutResults=[];
  absWorkoutResults=[];
  coreWorkoutResults=[];
  legsIsEmpty=false;
  backIsEmpty=false;
  chestIsEmpty=false;
  shouldersIsEmpty=false;
  bicepsIsEmpty=false;
  tricepsIsEmpty=false;
  absIsEmpty=false;
  coreIsEmpty=false;
  noResults=false;
  i:number=0;

  constructor(private workoutService: WorkoutService,private resultCardService: ResultCard2Service,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    }); 
     }

  ngOnInit(): void {

  }
  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  /* In the case of clicking search button */
  getResults() {
    /*if (this.search==true){
      this.resultCard.arraysInitialization();
      this.search=false;
      //this.content={"category":this.selectedOptionsCategories,"advisedFor":this.selectedOptionsAdvisedFor,"difficulty":this.selectedOptionsDifficulty,"equipment": [this.selectedOptionsEquipment]};
      //this.resultCard.getFilters(this.content);
      this.router.navigate([this.router.url]);
    }
    else{
      this.isClicked=true;
      this.search = true;
      this.content={"category":this.selectedOptionsCategories,"advisedFor":this.selectedOptionsAdvisedFor,"difficulty":this.selectedOptionsDifficulty,"equipment": [this.selectedOptionsEquipment]};
    }*/
    this.isClicked=true;
    this.content={"category":this.selectedOptionsCategories,"advisedFor":this.selectedOptionsAdvisedFor,"difficulty":this.selectedOptionsDifficulty,"equipment": [this.selectedOptionsEquipment]};
    this.workoutService.getResults(this.content).toPromise().then(data=>{
      this.results=data.workoutList;
      
      /*for (this.i=0;this.i<this.results.length;this.i++){
        if (this.results[this.i].category=='legs'){
          this.legsWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='chest'){
          this.chestWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='back'){
          this.backWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='shoulders'){
          this.shouldersWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='biceps'){
          this.bicepsWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='triceps'){
          this.tricepsWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='abs'){
          this.absWorkoutResults.push(this.results[this.i]);
        }
        if (this.results[this.i].category=='core'){
          this.coreWorkoutResults.push(this.results[this.i]);
        }
      }
      if (this.legsWorkoutResults.length==0){
        this.legsIsEmpty=true;
      }
      if (this.backWorkoutResults.length==0){
        this.backIsEmpty=true;
      }
      if (this.chestWorkoutResults.length==0){
        this.chestIsEmpty=true;
      }
      if (this.shouldersWorkoutResults.length==0){
        this.shouldersIsEmpty=true;
      }
      if (this.bicepsWorkoutResults.length==0){
        this.bicepsIsEmpty=true;
      }
      if (this.tricepsWorkoutResults.length==0){
        this.tricepsIsEmpty=true;
      }
      if (this.absWorkoutResults.length==0){
        this.absIsEmpty=true;
      }
      if (this.coreWorkoutResults.length==0){
        this.coreIsEmpty=true;
      }*/
    },
    error=>{

    })
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

