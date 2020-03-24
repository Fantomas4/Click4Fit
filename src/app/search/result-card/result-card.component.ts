import {Component, Input, OnInit} from '@angular/core';
import {BusinessEntry} from '../../business-entry';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {

  @Input() businessData;

  cardTitle: string;
  cardCategory: string;
  cardCountry: string;
  cardCity: string;
  cardImagePath: string;

  constructor() {}

  ngOnInit(): void {
    this.cardTitle = this.businessData.name;
    this.cardCategory = this.businessData.type;
    this.cardCountry = this.businessData.country;
    this.cardCity = this.businessData.city;
    this.cardImagePath = this.businessData.imgPath;
  }

}
