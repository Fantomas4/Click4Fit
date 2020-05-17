import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {UserDetailsEditDialogService} from './user-details-edit-dialog.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-details-user-edit',
  templateUrl: './user-details-edit-dialog.html',
  styleUrls: ['./user-details-edit-dialog.css'],
   providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class UserDetailsEditDialogComponent implements OnInit {

  id: number; // The displayed entry's id.
  name: string; // The displayed entry's first name.
  surname: string; // The displayed entry's last name.
  birthdate: FormControl; // Form Control used to receive the user's birth date input.
  // Form Control used to receive and validate the user's email input.
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email;
  picker;
  clickedSave:boolean;

  constructor(public dialogRef: MatDialogRef<UserDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private editDetailsService: UserDetailsEditDialogService,private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this._adapter.setLocale('en');
    // Extract the data from the payload and store it into the class properties
    this.id = this.data._id;
    this.name = this.data.name;
    this.surname = this.data.surname;
    this.birthdate = new FormControl(new Date(this.data.birthdate));
    this.email=this.data.email;
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
    var content = {"_id":this.id,"name":this.name,"surname":this.surname,"birthdate":this.data.birthdate,"email":this.email};
    this.clickedSave=true;
    this.dialogRef.close({'save':this.clickedSave,'details':content});
  }

}
