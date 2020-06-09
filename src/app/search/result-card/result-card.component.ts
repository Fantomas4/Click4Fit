import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DetailsDialogComponent} from '../details-dialog/details-dialog.component';
import {BusinessEntry} from '../../business-entry';

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

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Load data from businessData into the result card object's properties.
    this.title = this.businessData.name;

    // Change the "category" text to the appropriate format
    switch (this.businessData.category) {
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
        name: this.title,
        imgPath: this.imgPath,
        category: this.category,
        country: this.country,
        city: this.city,
        services: this.businessData.services,
        products: this.businessData.products
      }
    });
  }
}
