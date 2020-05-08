import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {LegsWorkoutEntry,BackWorkoutEntry,ChestWorkoutEntry,ShouldersWorkoutEntry,
  BicepsWorkoutEntry,TricepsWorkoutEntry,AbsWorkoutEntry,CoreWorkoutEntry} from '../../workout-entry';
import {WorkoutService} from '.././workout.service';
import {ResultCard2Service} from './result-card2.service';

@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {
  
  @Input() filters ;

  legsWorkoutResults: LegsWorkoutEntry[];
  chestWorkoutResults: ChestWorkoutEntry[];
  backWorkoutResults: BackWorkoutEntry[];
  shouldersWorkoutResults: ShouldersWorkoutEntry[];
  bicepsWorkoutResults: BicepsWorkoutEntry[];
  tricepsWorkoutResults: TricepsWorkoutEntry[];
  absWorkoutResults: AbsWorkoutEntry[];
  coreWorkoutResults: CoreWorkoutEntry[];
  legsIsEmpty=false;
  backIsEmpty=false;
  chestIsEmpty=false;
  shouldersIsEmpty=false;
  bicepsIsEmpty=false;
  tricepsIsEmpty=false;
  absIsEmpty=false;
  coreIsEmpty=false;
  results;
  name:string;
  i:number;

  //DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer,private workoutService: WorkoutService,private resultCardSrvice: ResultCard2Service){}

  ngOnInit(): void {
    //this.results=this.resultCardSrvice.passResults();
    //console.log(this.filters);
    this.resultCardSrvice.postFilters(this.filters).toPromise().then((data:any)=>{
      if (data.response==200){
        this.results=data.workoutList;
        for (this.i=0;this.i<this.results.length;this.i++){
          if (this.results.categories[this.i]=='Legs'){
            this.legsWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Back'){
            this.backWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Chest'){
            this.chestWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Shoulders'){
            this.shouldersWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Biceps'){
            this.bicepsWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Triceps'){
            this.tricepsWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Abs'){
            this.absWorkoutResults[this.i]=this.results[this.i];
          }
          if (this.results.categories[this.i]=='Core'){
            this.coreWorkoutResults[this.i]=this.results[this.i];
          }
        }
      }
    });
    //gets all the results and adds them in a seperated array
    this.workoutService.getLegsResults().subscribe(results => this.legsWorkoutResults = results);
    this.workoutService.getBackResults().subscribe(results => this.backWorkoutResults = results);
    this.workoutService.getChestResults().subscribe(results => this.chestWorkoutResults = results);
    this.workoutService.getShouldersResults().subscribe(results => this.shouldersWorkoutResults = results);
    this.workoutService.getBicepsResults().subscribe(results => this.bicepsWorkoutResults = results);
    this.workoutService.getTricepsResults().subscribe(results => this.tricepsWorkoutResults = results);
    this.workoutService.getAbsResults().subscribe(results => this.absWorkoutResults = results);
    this.workoutService.getCoreResults().subscribe(results => this.coreWorkoutResults = results);
    //in the case of zero workout results
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
    }
  
  }

}
