import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DetailsDialogComponent} from '../details-dialog/details-dialog.component';
import {BusinessEntry} from '../../business-entry';
import {ResultCardService} from './result-card.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {

  @Input() businessData: BusinessEntry;

  title: string; // Card title text.
  category: string; // Card category text.
  country: string; // Card country text.
  city: string; // Card city text.
  imgPath: string; // Card preview image path.
  jsonData; // Json data for the request to API 
  content; // Json with the current user which has been saved in session storage after log in
  user:string; // Email of current user
  favorite = false; //it shows if the workout entry has been added in favorites successfully and 
  //in this way the empty heart icon changes to full heart icon

  constructor(public dialog: MatDialog, private resultCardService: ResultCardService) {
  }

  ngOnInit(): void {
    // Load data from businessData into the result card object's properties.
    this.title = this.businessData.name;

    // Change the "category" text to the appropriate format
    switch(this.businessData.category) {
      case 'gym':
        this.category = 'Gym';
        break;

      case 'personal trainer':
        this.category = 'Personal Trainer';
        break;

      case 'fitness shop':
        this.category = 'Fitness Shop';
        break;
    }

    this.country = this.businessData.country;
    this.city = this.businessData.city;
    this.imgPath = this.businessData.imgPath;
  }

  /**
   * Spawns the "Details" dialog window.
   */
  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '600px',
      data: {
        name: this.title, category: this.category,
        country: this.country, city: this.city, services:
        this.businessData.services, products: this.businessData.products
      }
    });
  }
  onClick(entry){
    this.jsonData = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = this.jsonData.email;
    this.content = {
      "user": { "email": this.user }, "new_favorite": {
        "name": this.title, "country": this.country, "city": this.city, "imgPath":this.imgPath
      }
    }
    this.resultCardService.addFavoritePlace(this.content).toPromise().then(data => {
      this.favorite = true;
    });
  }
}
