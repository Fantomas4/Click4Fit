import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {AlertService} from '../../core/alert.service';
import {Subscription} from 'rxjs';
import {ResultCard2Service} from './result-card2.service';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {
  
  @Input() filters ;

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
  results;
  name:string;
  i:number;
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  favorite=false;


  //DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer,private resultCardSrvice: ResultCard2Service,private alertService: AlertService){}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.resultCardSrvice.postFilters(this.filters).toPromise().then((data:any)=>{
      if (data.response==200){
        this.results=data.workoutList;
        for (this.i=0;this.i<this.results.length;this.i++){
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
        }
      }
      else{
        this.noResults=true;
        this.alertService.error(data.msg);
      }
    });
  
  }
  onClick(entry){
    this.resultCardSrvice.addFavoriteWorkout(entry).toPromise().then((data:any)=>{
      if (data.response==200){
        this.favorite=true;
      }
    });
  }

}
