import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {
  cardTitle: string;
  cardImagePath: string;
  cardShortDescription: string;

  constructor() { }

  ngOnInit(): void {
  }

}
