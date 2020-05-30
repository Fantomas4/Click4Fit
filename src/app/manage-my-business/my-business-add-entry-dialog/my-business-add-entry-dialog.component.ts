import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './my-business-add-entry-dialog.component.html',
  styleUrls: ['./my-business-add-entry-dialog.component.css']
})
export class MyBusinessAddEntryDialogComponent implements OnInit {

  id: number;
  name: string;
  category: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  services: string[];
  products: string[];
  imgPath: string;
  email;
  clickedSave: boolean;

  constructor(public dialogRef: MatDialogRef<MyBusinessAddEntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    const content = {
    user: {
      _id: (JSON.parse(sessionStorage.getItem('currentUser')))._id
    },
    business: {
      name: this.name,
      category: this.category,
      country: this.country,
      city: this.city,
      address: this.address,
      postalCode: this.postalCode,
      phoneNumber: this.phoneNumber,
      services: this.services,
      products: this.products,
      imgPath: this.imgPath,
      email: this.email}
    };
    this.dialogRef.close({clickedSave: true, details: content});
  }

}
