import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {LegsWorkoutEntry,BackWorkoutEntry,ChestWorkoutEntry,ShouldersWorkoutEntry,
  BicepsWorkoutEntry,TricepsWorkoutEntry,AbsWorkoutEntry,CoreWorkoutEntry} from '../../workout-entry';
import {WorkoutService} from '.././workout.service';

@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {
  
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

  //DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer,private workoutService: WorkoutService){}

  ngOnInit(): void {
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
