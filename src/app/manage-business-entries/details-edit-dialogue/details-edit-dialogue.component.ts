import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './dialog-data';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './details-edit-dialogue.component.html',
  styleUrls: ['./details-edit-dialogue.component.css']
})
export class DetailsEditDialogueComponent implements OnInit {

  // https://angular.io/api/forms/FormControlDirective#use-with-ngmodel
  id: number;
  name: string;
  category: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumbers: string[];
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  availableServProd: string[];
  imgPath: string[];

  constructor(public dialogRef: MatDialogRef<DetailsEditDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.name = this.data.name;
    this.category = this.data.category;
    this.country = this.data.country;
    this.city = this.data.city;
    this.address = this.data.address;
    this.postalCode = this.data.postalCode;
    this.phoneNumbers = this.data.phoneNumbers;
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
