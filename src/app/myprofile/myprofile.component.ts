import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyProfileService } from './myprofile.service';
import {MAT_MOMENT_DATE_FORMATS,MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import { DeleteDialogMessageComponent } from './delete-dialog-message/delete-dialog-message.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },]
})
export class MyprofileComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  name: string;
  surname: string;
  birthdate: FormControl;
  email: string;
  password: string;
  newPassword: string;
  newRepeatedPassword: string;
  content;
  results;
  picker;
  emailuser;
  id: string;
  message;
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  result: boolean;

  constructor(public myprofileService: MyProfileService, private _adapter: DateAdapter<any>, 
    private alertService: AlertService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._adapter.setLocale('en');
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.emailuser = { "email": "angath@gmail.com" };
    this.myprofileService.displayUser(this.emailuser).subscribe(data => {
      this.results = data.user;
      this.id = this.results._id;
      this.name = this.results.name;
      this.surname = this.results.surname;
      this.email = this.results.email;
      this.birthdate = new FormControl(new Date(this.results.birthdate));
    },
      error => {
        this.alertService.error(error.errror);
      });
  }

  /*Checks if the email form has been completed or if the email is valid*/
  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  /*Shows modal message after click on delete account button*/
  onClickDelete() {
    this.content = { "_id": this.id, "name": this.name, "surname": this.surname, "email": this.email, "password": this.newPassword, "birthdate": this.results.birthdate };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 100;
    const dialogRef = this.dialog.open(DeleteDialogMessageComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      if (this.result == true) {
        this.myprofileService.deleteProfile(this.content).toPromise().then(data => {
          this.alertService.success(data);
        },
          error => {
            this.alertService.error(error.error);
          })
      }
    });
  }
  /*Updates the user's details in the database according to his changes*/
  onClickUpdate() {
    if (this.newPassword == this.newRepeatedPassword) {
      this.content = { "user": { "email": this.email, "password": this.password }, "new_password": this.newPassword };
      this.myprofileService.updateChanges(this.content).toPromise().then(data => {
        this.alertService.success(data);
      },
        error => {
          this.alertService.error(error.error);
        });
    }
    else {
      this.alertService.error('New password and new repeated password are not same');
    }
  }
}

