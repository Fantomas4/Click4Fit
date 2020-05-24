import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../core/alert.service';
import { Subscription } from 'rxjs';
import { ResultCard2Service } from './result-card2.service';


@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {

  @Input() workoutEntry;

  user:string;
  jsonData;
  content;
  name: string;
  category:string;
  muscleGroups:[];
  advisedFor:string;
  difficulty:string;
  sets:string;
  videoUrl:string;
  equipment:boolean;
  i: number;
  favorite = false;


  //DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer, private resultCardSrvice: ResultCard2Service) { }

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

  onClick(entry) {
    this.jsonData=JSON.parse(sessionStorage.getItem('currentUser'));
    this.user=this.jsonData.email;
    this.content={"user":{"email":this.user}, "new_favorite":{"name":entry.name, "category":entry.category,
    "muscleGroups":entry.muscleGroups, "advisedFor":entry.advisedFor, "difficulty":entry.difficulty,
    "equipment":entry.equipment, "sets":entry.sets, "videoUrl":entry.videoUrl}};
    this.resultCardSrvice.addFavoriteWorkout(this.content).toPromise().then((data: any) => {
      if (data.response == 200) {
        this.favorite = true;
      }
    });
  }

}
