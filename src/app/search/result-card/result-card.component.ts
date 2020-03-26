import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DetailsDialogComponent} from '../details-dialog/details-dialog.component';

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

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cardTitle = this.businessData.name;
    this.cardCategory = this.businessData.type;
    this.cardCountry = this.businessData.country;
    this.cardCity = this.businessData.city;
    this.cardImagePath = this.businessData.imgPath;
  }

  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '600px',
      data: {
        name: this.businessData.name, category: this.businessData.type,
        country: this.businessData.country, city: this.businessData.city, availableServProd:
        this.businessData.availableServProd
      }

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.animal = result;
      // });

    });

  }
}
