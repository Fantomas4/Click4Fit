import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../../business-entry';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './business-details-edit-dialog.component.html',
  styleUrls: ['./business-details-edit-dialog.component.css']
})
export class BusinessDetailsEditDialogComponent implements OnInit {

  // https://angular.io/api/forms/FormControlDirective#use-with-ngmodel
  id: number;
  name: string;
  category: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  availableServProd: string[];
  imgPath: string;

  constructor(public dialogRef: MatDialogRef<BusinessDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BusinessEntry) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.name = this.data.name;
    this.category = this.data.category;
    this.country = this.data.country;
    this.city = this.data.city;
    this.address = this.data.address;
    this.postalCode = this.data.postalCode;
    this.phoneNumber = this.data.phoneNumber;
    this.emailFormControl.setValue(this.data.email);
    this.availableServProd = this.data.availableServProd;
    this.imgPath = this.data.imgPath;
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  onCloseClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close();
  }

  onSaveClick(): void {

  }
}
