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

  cardTitle: string; // Card title text.
  cardCategory: string; // Card category text.
  cardCountry: string; // Card country text.
  cardCity: string; // Card city text.
  cardImagePath: string; // Card preview image path.

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Load data from businessData into the result card object's properties.
    this.cardTitle = this.businessData.name;
    this.cardCategory = this.businessData.category;
    this.cardCountry = this.businessData.country;
    this.cardCity = this.businessData.city;
    this.cardImagePath = this.businessData.imgPath;
  }

  /**
   * Spawns the "Details" dialog window.
   */
  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '600px',
      data: {
        name: this.businessData.name, category: this.businessData.category,
        country: this.businessData.country, city: this.businessData.city, services:
        this.businessData.services, products: this.businessData.products
      }
    });
  }
}
