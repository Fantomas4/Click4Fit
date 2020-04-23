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

  id: number; // The displayed entry's id.
  firstName: string; // The displayed entry's first name.
  lastName: string; // The displayed entry's last name.
  date: FormControl; // Form Control used to receive the user's birth date input.
  // Form Control used to receive and validate the user's email input.
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<UserDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserEntry) { }

  ngOnInit(): void {
    // Extract the data from the payload and store it into the class properties
    this.id = this.data.id;
    this.firstName = this.data.name;
    this.lastName = this.data.lastname;
    this.date = new FormControl(new Date(this.data.birthdate));
    this.emailFormControl.setValue(this.data.email);

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
