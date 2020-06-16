import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { MyProfileService } from './myprofile.service';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import { DeleteDialogMessageComponent } from './delete-dialog-message/delete-dialog-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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

  entryForm = new FormGroup({
    password: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.required
    ]),
    repeatedPassword: new FormControl('', [
      Validators.required
    ]),
  })
  newPassword: string;
  newRepeatedPassword: string;
  jsonData: any; // it contains a json with the current user which has been saved in session storage after log in
  results: any; //it contains the results from the request to API 
  picker: any;
  user: any; // it contains the email of the current logged in user
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  deleteProfile: boolean; // it contains the choice of user about deleting his profile or not
  genericErrorStateMatcher = new GenericErrorStateMatcher();

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
      console.log(this.results.name);
      this.entryForm.setValue({
        name: this.results.name,
        lastName: this.results.surname,
        email: this.results.email,
        birthDate: this.results.birthdate
      });
    },
      error => { // if the request returns an error, it shows an alert message with the relevant content
        this.alertService.error(error.error);
      });
  }

  /*Shows modal message after click on delete account button*/
  onClickDelete() {
    const content = { "_id": this.jsonData._id }; // it contains the json data for the request to API 
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
            this.alertService.error(error.error);
          })
      }
    });
  }
  /*Updates the user's details in the database according to his changes*/
  onClickUpdate() {
    if (this.entryForm.valid) {
      this.newPassword = this.entryForm.get('password').value;
      this.newRepeatedPassword = this.entryForm.get('repeatedPassword').value;
      if (this.newPassword == this.newRepeatedPassword) {
        const formData = new FormData();
        formData.append('_id', this.jsonData._id);
        formData.append('name', this.entryForm.get('name').value);
        formData.append('lastName', this.entryForm.get('lastName').value);
        formData.append('birthDate', this.entryForm.get('birthDate').value);
        formData.append('password', this.newPassword);
        formData.append('newPassword', this.newRepeatedPassword);
        formData.append('repeatedPassword', this.entryForm.get('repeatedPassword').value);
        this.myprofileService.updateChanges(formData).toPromise().then(data => {
          this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
        },
          error => { // if the request returns an error, it shows an alert message with the relevant content
            this.alertService.error(error.error);
          });
      }
      else {  // if the user didn't give same new password and new repeated password, 
        //it shows an alert message with the relevant content
        this.alertService.error('New password and new repeated password are not same');
      }
    }
  }
}

