import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../core/alert.service';
import { Subscription } from 'rxjs';
import { ResultCard2Service } from './result-card2.service';

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

  /*@Input() legsWorkoutResults;
  @Input() chestWorkoutResults;
  @Input() backWorkoutResults;
  @Input() shouldersWorkoutResults;
  @Input() bicepsWorkoutResults;
  @Input() tricepsWorkoutResults;
  @Input() absWorkoutResults;
  @Input() coreWorkoutResults;
  @Input() legsIsEmpty;
  @Input() backIsEmpty;
  @Input() chestIsEmpty;
  @Input() shouldersIsEmpty;
  @Input() bicepsIsEmpty;
  @Input() tricepsIsEmpty;
  @Input() absIsEmpty;
  @Input() coreIsEmpty;
  @Input() noResults;*/
  @Input() workoutEntry;


  name: string;
  category:string;
  muscleGroups:[];
  advisedFor:string;
  difficulty:string;
  sets:string;
  videoUrl:string;
  equipment:boolean;
  i: number;
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  favorite = false;


  //DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer, private resultCardSrvice: ResultCard2Service,
    private alertService: AlertService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.name=this.workoutEntry.name;
    this.category=this.workoutEntry.category;
    this.muscleGroups=this.workoutEntry.muscleGroups;
    this.advisedFor=this.workoutEntry.advisedFor;
    this.equipment=this.workoutEntry.equipment;
    this.difficulty=this.workoutEntry.difficulty;
    this.videoUrl=this.workoutEntry.videoUrl;
    this.sets=this.workoutEntry.sets;

  }
  /*ngOnChanges(changes: SimpleChanges): void {
    //},
    /*error=>{
      this.noResults=true;
      this.alertService.error(error.error);
    });
    console.log('yes');
    console.log(this.legsWorkoutResults);
    console.log(this.chestWorkoutResults);
  }*/

  onClick(entry) {
    this.resultCardSrvice.addFavoriteWorkout(entry).toPromise().then((data: any) => {
      if (data.response == 200) {
        this.favorite = true;
      }
    });
  }
  arraysInitialization() {
    /*this.legsWorkoutResults.length = 0;
    this.backWorkoutResults.length = 0;
    this.chestWorkoutResults.length = 0;
    this.shouldersWorkoutResults.length = 0;
    this.bicepsWorkoutResults.length = 0;
    this.tricepsWorkoutResults.length = 0;
    this.absWorkoutResults.length = 0;
    this.coreWorkoutResults.length = 0;*/
  }


}
