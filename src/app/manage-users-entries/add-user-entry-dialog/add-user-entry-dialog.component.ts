import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-add-user-entry-dialog',
  templateUrl: './add-user-entry-dialog.component.html',
  styleUrls: ['./add-user-entry-dialog.component.css']
})
export class AddUserEntryDialogComponent implements OnInit {

  id: number;
  name: string;
  lastname: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<AddUserEntryDialogComponent>) { }

  ngOnInit(): void {
  }

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
