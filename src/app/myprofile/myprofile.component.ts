import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyProfileService } from './myprofile.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import { DeleteDialogMessageComponent } from './delete-dialog-message/delete-dialog-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  id: string;
  name: string;
  surname: string;
  birthdate: FormControl;
  email: string;
  password: string;
  newPassword: string;
  newRepeatedPassword: string;
  content; // it contains the json data for the request to API
  jsonData; // it contains a json with the current user which has been saved in session storage after log in
  results; // it contains the results from the request to API
  user; // it contains the email of the current logged in user
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  deleteProfile: boolean; // it contains the choice of user about deleting his profile or not

  constructor(public myprofileService: MyProfileService, private _adapter: DateAdapter<any>,
              private alertService: AlertService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.jsonData = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = { email: this.jsonData.email };
    this.myprofileService.displayUser(this.user).subscribe(data => { // in case of successful request it shows the data
        this.results = data.user;
        this.id = this.results._id;
        this.name = this.results.name;
        this.surname = this.results.surname;
        this.email = this.results.email;

        // Use regex to extract date data from the birthday string recovered from DB.
        const separators = ['-', '/', '\\\.', ','];
        const dateTokens = this.results.birthdate.split(new RegExp(separators.join('|'), 'g'));
        this.birthdate = new FormControl(new Date(Number(dateTokens[2]), Number(dateTokens[1]) - 1, Number(dateTokens[0])));
      },
      error => { // if the request returns an error, it shows an alert message with the relevant content
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof(error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
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
    this.content = { _id: this.id, name: this.name, surname: this.surname, email: this.email, password: this.newPassword, birthdate: this.results.birthdate };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 100;
    const dialogRef = this.dialog.open(DeleteDialogMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.deleteProfile = result;
      if (this.deleteProfile) {
        this.myprofileService.deleteProfile(this.content).toPromise().then(data => {
            this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
          },
          error => {  // if the request returns an error, it shows an alert message with the relevant content
            this.alertService.error(error.error);
          });
      }
    });
  }
  /*Updates the user's details in the database according to his changes*/
  onClickUpdate() {
    if (this.newPassword === this.newRepeatedPassword) {
      this.content = { user: { email: this.email, password: this.password }, new_password: this.newPassword };
      this.myprofileService.updateChanges(this.content).toPromise().then(data => {
          this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
        },
        error => { // if the request returns an error, it shows an alert message with the relevant content
          // If error is not a string received from the API, handle the ProgressEvent
          // returned due to the inability to connect to the API by printing an appropriate
          // warning message
          if (typeof(error) !== 'string') {
            this.alertService.error('Error: No connection to the API');
          } else {
            this.alertService.error(error);
          }
        });
    } else {  // if the user didn't give same new password and new repeated password,
      // it shows an alert message with the relevant content
      this.alertService.error('New password and new repeated password are not same');
    }
  }
}
