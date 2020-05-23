import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../../business-entry';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  title: string;
  category: string;
  previewImagePath = './assets/image_placeholder.jpg';
  country: string;
  city: string;
  services: string[];
  products: string[];

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BusinessEntry) {}

  /**
   * Method called when the "Close" button is pressed.
   */
  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

}
