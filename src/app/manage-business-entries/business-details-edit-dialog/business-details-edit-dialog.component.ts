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

  id: number; // The displayed entry's id.
  name: string; // The displayed entry's name.
  category: string; // The displayed entry's category.
  country: string; // The displayed entry's country location.
  city: string; // The displayed entry's city location.
  address: string; // The displayed entry's address location.
  postalCode: string; // The displayed entry's postalCode location.
  phoneNumber: string; // The displayed entry's phone number.
  availableServProd: string[]; // List containing the titles of the available products and services offered by the displayed entry.
  imgPath: string; // String containing the path for the preview image of the displayed entry.

  // Form Control used to receive and validate the user's email input.
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<BusinessDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BusinessEntry) {}

  ngOnInit(): void {
    // Extract the data from the payload and store it into the class properties
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

  /**
   *  Retrieves and returns any errors that have occurred in
   *  the email Form Control.
   */
  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * Called to close the "Edit/Details" dialog window.
   */
  onCloseClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close();
  }

  onSaveClick(): void {

  }
}