import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../../business-entry';
import {FormControl, Validators} from '@angular/forms';
import {UsersEntry} from '../../users-entry';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css']
})
export class AddEditDialogComponent implements OnInit {

  // https://angular.io/api/forms/FormControlDirective#use-with-ngmodel
  id: number;
  name: string;
  lastname: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UsersEntry) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.name = this.data.name;
    this.lastname = this.data.lastname;
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

