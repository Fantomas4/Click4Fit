import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserEntry} from '../../user-entry';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-details-user-edit',
  templateUrl: './user-details-edit-dialog.html',
  styleUrls: ['./user-details-edit-dialog.css']
})
export class UserDetailsEditDialogComponent implements OnInit {

  id: number;
  firstName: string;
  lastName: string;
  birthDateFormControl = new FormControl(new Date());
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<UserDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserEntry) { }

  ngOnInit(): void {

    this.id = this.data.id;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    // this.birthDateFormControl;
    this.emailFormControl.setValue(this.data.email);

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
