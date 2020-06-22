import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { MyProfileService } from './myprofile.service';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import { DeleteDialogMessageComponent } from './delete-dialog-message/delete-dialog-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {AuthenticationService} from '../login/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';


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

export class PasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(form.hasError('passwordMismatch') || control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function matchingPasswordsValidator(group: FormGroup): { [key: string]: boolean } | null {
  if ((group.get('newPassword').value !== '' && group.get('repeatedPassword').value !== '') &&
    group.get('newPassword').value !== group.get('repeatedPassword').value) {
    return {passwordMismatch : true};
  }
  return null;
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})

export class MyprofileComponent implements OnInit {

  detailsEntryForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    birthDate: new FormControl(),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  passwordEntryForm = new FormGroup({
    password: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.required
    ]),
    repeatedPassword: new FormControl('', [
      Validators.required
    ]),
  }, [matchingPasswordsValidator]);

  genericErrorStateMatcher = new GenericErrorStateMatcher();
  passwordsErrorStateMatcher = new PasswordsErrorStateMatcher();

  picker: any;

  alertMessage: AlertMessage;
  alertSubscription: Subscription;

  constructor(public myprofileService: MyProfileService, private authenticationService: AuthenticationService,
              private router: Router, private alertService: AlertService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });

    const requestData = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};
    this.myprofileService.getUser(requestData).subscribe(
      data => { // in case of successful request it shows the data
        const userData = data.body.user;

        const separators = ['-', '/', '\\\.', ','];
        const dateTokens = userData.birthdate.split(new RegExp(separators.join('|'), 'g'));

        this.detailsEntryForm.setValue({
          firstName: userData.name,
          lastName: userData.surname,
          birthDate: new Date(Number(dateTokens[2]), Number(dateTokens[1]) - 1, Number(dateTokens[0])),
          email: userData.email
        });

      },
      error => {
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof (error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
      });
  }

  /**
   * Called when a user adds or removes favorites from his preferences, in order to update
   * the local storage user data with the latest input from the Data Base.
   */
  updateUserData() {
    const request = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};
    this.myprofileService.getUser(request).subscribe(
      data => {
        // @ts-ignore
        const {surname, favoriteWorkout, token, _id, name, email, privilegeLevel, favoriteBusiness} = data.body.user;
        const loggedInUserData = {
          _id,
          name,
          surname,
          email,
          privilegeLevel,
          token,
          favoriteBusiness,
          favoriteWorkout
        };

        sessionStorage.setItem('currentUser', JSON.stringify(loggedInUserData));
      },

      error => {
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof (error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
      });

  }

  onDetailsModify() {
    if (this.detailsEntryForm.valid) {
      const datePipe = new DatePipe('en').transform(this.detailsEntryForm.get('birthDate').value, 'dd/MM/yyyy');

      const requestData: object = {
        _id: JSON.parse(sessionStorage.getItem('currentUser'))._id,
        name: this.detailsEntryForm.get('firstName').value,
        surname: this.detailsEntryForm.get('lastName').value,
        birthdate: datePipe ? datePipe : '',
        email: this.detailsEntryForm.get('email').value,
      };

      this.myprofileService.modifyUser(requestData).pipe(first()).subscribe(
        data => {
          this.alertService.success(data.body);
        },

        error => {
          // If error is not a string received from the API, handle the ProgressEvent
          // returned due to the inability to connect to the API by printing an appropriate
          // warning message
          if (typeof (error) !== 'string') {
            this.alertService.error('Error: No connection to the API');
          } else {
            this.alertService.error(error);
          }
        }
      );
      // Get the updated user data from the Data Base and update the local user data.
      this.updateUserData();
    }
  }

  onPasswordUpdate() {
    if (this.passwordEntryForm.valid) {
      const requestData: object = {
        user: {
          _id: JSON.parse(sessionStorage.getItem('currentUser'))._id,
          password: this.passwordEntryForm.get('password').value
        },
        new_password: this.passwordEntryForm.get('newPassword').value
      };

      this.myprofileService.updatePassword(requestData).pipe(first()).subscribe(
        data => {
          this.alertService.success(data.body);
        },

        error => {
          // If error is not a string received from the API, handle the ProgressEvent
          // returned due to the inability to connect to the API by printing an appropriate
          // warning message
          if (typeof (error) !== 'string') {
            this.alertService.error('Error: No connection to the API');
          } else {
            this.alertService.error(error);
          }
        });
    }

  }

  /***
   * Logs out the user and redirects him to the main paige
   */
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  onDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 100;
    const dialogRef = this.dialog.open(DeleteDialogMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the user has confirmed his choice, proceed with the account deletion
        const requestData: object = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};

        this.myprofileService.deleteUser(requestData).pipe(first()).subscribe(
          data => {
            this.alertService.success(data.body);
            // If the user was deleted successfully from the database, call logout()
            this.logout();
          },

          error => {
            // If error is not a string received from the API, handle the ProgressEvent
            // returned due to the inability to connect to the API by printing an appropriate
            // warning message
            if (typeof (error) !== 'string') {
              this.alertService.error('Error: No connection to the API');
            } else {
              this.alertService.error(error);
            }
        });
      }
    });
  }
}
