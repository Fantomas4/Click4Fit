import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersEntry} from '../../users-entry';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-details-user-edit',
  templateUrl: './details-user-edit.component.html',
  styleUrls: ['./details-user-edit.component.css']
})
export class DetailsUserEditComponent implements OnInit {

  id: number;
  name: string;
  lastname: string;
  birthdate: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<DetailsUserEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UsersEntry) { }

  ngOnInit(): void {

    this.id = this.data.id;
    this.name = this.data.name;
    this.lastname = this.data.lastname;
    this.birthdate = this.data.birthdate;
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
