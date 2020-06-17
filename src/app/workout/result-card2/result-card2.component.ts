import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ResultCard2Service } from './result-card2.service';


@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {

  @Input() workoutEntry; // it gets each entry of results

  user: string;
  jsonData: any; // it contains the json data for the request to API  content; // it contains a json with the current user which has been saved in session storage after log in
  name: string;
  category: string;
  muscleGroups: [];
  advisedFor: string;
  difficulty: string;
  sets: string;
  videoUrl: string;
  equipment: boolean;
  favorite = false; //it shows if the workout entry has been added in favorites successfully and 
  //in this way the empty heart icon changes to full heart icon


  //DomSanitizer helps to pass url video safe
  constructor(public sanitizer: DomSanitizer, private resultCardSrvice: ResultCard2Service) { }

  ngOnInit(): void {
    this.name = this.workoutEntry.name;
    this.category = this.workoutEntry.category;
    this.muscleGroups = this.workoutEntry.muscleGroups;
    this.advisedFor = this.workoutEntry.advisedFor;
    this.equipment = this.workoutEntry.equipment;
    this.difficulty = this.workoutEntry.difficulty;
    this.videoUrl = this.workoutEntry.videoUrl;
    this.sets = this.workoutEntry.sets;

  }

  onClick(entry) {
    this.jsonData = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = this.jsonData.email;
    var content = {
      "user": { "email": this.user }, "new_favorite": {
        "name": entry.name, "category": entry.category,
        "muscleGroups": entry.muscleGroups, "advisedFor": entry.advisedFor, "difficulty": entry.difficulty,
        "equipment": entry.equipment, "sets": entry.sets, "videoUrl": entry.videoUrl
      }
    };
    this.resultCardSrvice.addFavoriteWorkout(content).toPromise().then(data => {
      this.favorite = true;
    },
      error => {

      });
  }

}
