import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { MyProfileService } from './myprofile.service';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import { DeleteDialogMessageComponent } from './delete-dialog-message/delete-dialog-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


interface AlertMessage {
  type: string;
  text: string;
}
export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  firstEntryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    birthDate: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  })
  secondEntryForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required
    ]),
    repeatedPassword: new FormControl('', [
      Validators.required
    ]),
  })
  password: string;
  newPassword: string;
  repeatedPassword: string;
  jsonData: any; // it contains a json with the current user which has been saved in session storage after log in
  results: any; //it contains the results from the request to API 
  picker: any;
  user: any; // it contains the email of the current logged in user
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  deleteProfile: boolean; // it contains the choice of user about deleting his profile or not
  genericErrorStateMatcher = new GenericErrorStateMatcher();
  passwordChanged: boolean = false;
  fieldChanged: boolean = false;
  name: any;
  lastName: any;
  email: any;
  birthDate: any;

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
    this.user = { "email": this.jsonData.email };
    this.myprofileService.displayUser(this.user).subscribe(data => { //in case of successful request it shows the data
      this.results = data.user;
      const separators = ['-', '/', '\\\.', ','];
      const dateTokens = this.results.birthdate.split(new RegExp(separators.join('|'), 'g'));
      this.firstEntryForm.setValue({
        name: this.results.name,
        lastName: this.results.surname,
        email: this.results.email,
        birthDate: new Date(Number(dateTokens[2]), Number(dateTokens[1]) - 1, Number(dateTokens[0])),
        password: null
      });
      this.password = this.results.password;
      this.name = this.results.name;
      this.lastName = this.results.surname;
      this.email = this.results.email;
      this.birthDate = this.results.birthdate;
      this.secondEntryForm.setValue({
        newPassword: null,
        repeatedPassword: null
      })
    },
      error => { // if the request returns an error, it shows an alert message with the relevant content
        this.alertService.error(error);
      });
  }

  /*Shows modal message after click on delete account button*/
  onClickDelete() {
    var content = { "_id": this.jsonData._id }; // it contains the json data for the request to API 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 100;
    const dialogRef = this.dialog.open(DeleteDialogMessageComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      this.deleteProfile = result;
      if (this.deleteProfile == true) {
        this.myprofileService.deleteProfile(content).toPromise().then(data => {
          this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
        },
          error => {  // if the request returns an error, it shows an alert message with the relevant content
            this.alertService.error(error);
          })
      }
    });
  }
  /*Updates the user's details in the database according to his changes*/
  onClickUpdate() {
    var content;
    if (this.secondEntryForm.get('newPassword').value != null || this.secondEntryForm.get('repeatedPassword').value != null) {
      this.newPassword = this.secondEntryForm.get('newPassword').value;
      this.repeatedPassword = this.secondEntryForm.get('repeatedPassword').value;
      if (this.newPassword != this.repeatedPassword && this.newPassword != null && this.repeatedPassword != null) {
        // if the user didn't give same new password and new repeated password, 
        //it shows an alert message with the relevant content
        this.alertService.error('New password and new repeated password are not same');
      }
      else if (this.newPassword == this.repeatedPassword && this.newPassword != null && this.repeatedPassword != null) {
        this.passwordChanged = true;
      }
      else if (this.newPassword != null && this.repeatedPassword == null) {
        this.alertService.error('Enter the new password again');
      }
      else if (this.newPassword == null && this.repeatedPassword != null) {
        this.alertService.error('Enter the new password ');
      }
    }
    if (this.firstEntryForm.valid && (this.firstEntryForm.get('name').value != this.name || this.firstEntryForm.get('lastName').value != this.lastName
      || new DatePipe('en').transform(this.firstEntryForm.get('birthDate').value, 'dd/MM/yyyy') != this.birthDate || this.firstEntryForm.get('email').value != this.email)) {
      if (this.password != this.firstEntryForm.get('password').value) {
        this.alertService.error('Wrong password');
      }
      else {
        this.fieldChanged = true;
      }
    }
    if (this.passwordChanged == true && this.fieldChanged == true) {
      content = {
        "passwordChanged": true, "fieldChanged": true,
        "userJson": {
          "_id": this.jsonData._id, "email": this.firstEntryForm.get('email').value, "name": this.firstEntryForm.get('name').value,
          "surname": this.firstEntryForm.get('lastName').value, "birthdate": new DatePipe('en').transform(this.firstEntryForm.get('birthDate').value, 'dd/MM/yyyy'),
          "password": this.firstEntryForm.get('password').value
        },
        "passwordJson": {
          "user": { "email": this.firstEntryForm.get('email').value, "password": this.firstEntryForm.get('password').value },
          "new_password": this.secondEntryForm.get('newPassword').value
        }
      }
      this.myprofileService.updateChanges(content).toPromise().then(data => {
        this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
      },
        error => { // if the request returns an error, it shows an alert message with the relevant content
          this.alertService.error(error);
        });
    }
    else if (this.passwordChanged == false && this.fieldChanged == true) {
      content = {
        "passwordChanged": false, "fieldChanged": true,
        "userJson": {
          "_id": this.jsonData._id, "email": this.firstEntryForm.get('email').value, "name": this.firstEntryForm.get('name').value,
          "surname": this.firstEntryForm.get('lastName').value, "birthdate": new DatePipe('en').transform(this.firstEntryForm.get('birthDate').value, 'dd/MM/yyyy'),
          "password": this.firstEntryForm.get('password').value
        }
      }
      this.myprofileService.updateChanges(content).toPromise().then(data => {
        this.alertService.success(data);
      },
        error => {
          this.alertService.error(error);
        });
    }
    else if (this.firstEntryForm.valid && this.secondEntryForm.valid && this.passwordChanged == true && this.fieldChanged == false) {
      content = {
        "passwordChanged": true, "fieldChanged": false,
        "passwordJson": {
          "user": { "email": this.firstEntryForm.get('email').value, "password": this.firstEntryForm.get('password').value },
          "new_password": this.secondEntryForm.get('newPassword').value
        }
      };
      this.myprofileService.updateChanges(content).toPromise().then(data => {
        this.alertService.success(data);
      },
        error => {
          this.alertService.error(error);
        });
    }
    else if ((this.firstEntryForm.get('name').value == this.name && this.firstEntryForm.get('lastName').value == this.lastName
      && new DatePipe('en').transform(this.firstEntryForm.get('birthDate').value, 'dd/MM/yyyy') == this.birthDate && this.firstEntryForm.get('email').value == this.email)
      && !this.secondEntryForm.dirty) {
      this.alertService.error("You haven't changed anything");
    }
  }

}

