import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../../business-entry';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './business-add-entry-dialog.component.html',
  styleUrls: ['./business-add-entry-dialog.component.css']
})
export class BusinessAddEntryDialogComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<BusinessAddEntryDialogComponent>) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close();
  }

  onSaveClick(): void {

  }

}
