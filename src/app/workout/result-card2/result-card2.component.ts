import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result-card2',
  templateUrl: './result-card2.component.html',
  styleUrls: ['./result-card2.component.css']
})
export class ResultCard2Component implements OnInit {

  
  @Input() workoutData;

  cardName:string;
  cardCategory:string;
  cardVideo:string;
  cardSets:string;
  cardEquipment:string;
  cardAdvised:string;
  cardLevel:string;

  constructor(public sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.cardName=this.workoutData.name;
    this.cardCategory=this.workoutData.category;
    this.cardVideo=this.workoutData.video;
    this.cardSets=this.workoutData.sets;
    this.cardEquipment=this.workoutData.equipment;
    this.cardAdvised=this.workoutData.advisedFor;
    this.cardLevel=this.workoutData.levelOfDifficulty;
  }

}
