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

  deleteProfile: boolean; // it contains the choice of user about deleting his profile or not


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
        console.log(data.body.user);
        const userData = data.body.user;

        const separators = ['-', '/', '\\\.', ','];
        const dateTokens = userData.birthdate.split(new RegExp(separators.join('|'), 'g'));
        console.log(dateTokens);
        console.log(new Date(Number(dateTokens[2]), Number(dateTokens[1]) - 1, Number(dateTokens[0])));

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

  onDetailsUpdate() {
    if (this.detailsEntryForm.valid) {
      let requestData: object;

      console.log(this.detailsEntryForm.get('firstName').value);
      if (this.detailsEntryForm.get('birthDate').value !== null) {
        requestData = {
          _id: JSON.parse(sessionStorage.getItem('currentUser'))._id,
          name: this.detailsEntryForm.get('firstName').value,
          surname: this.detailsEntryForm.get('lastName').value,
          birthdate: new DatePipe('en').transform(this.detailsEntryForm.get('birthDate').value, 'dd/MM/yyyy'),
          email: this.detailsEntryForm.get('email').value,
        };
      } else {
        requestData = {
          _id: JSON.parse(sessionStorage.getItem('currentUser'))._id,
          name: this.detailsEntryForm.get('firstName').value,
          surname: this.detailsEntryForm.get('lastName').value,
          email: this.detailsEntryForm.get('email').value,
        };
      }

      this.myprofileService.updateUser(requestData).pipe(first()).subscribe(
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


    }
  }




  // /*Shows modal message after click on delete account button*/
  // onClickDelete() {
  //   const content = {_id: this.jsonData._id}; // it contains the json data for the request to API
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.minWidth = 100;
  //   const dialogRef = this.dialog.open(DeleteDialogMessageComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.deleteProfile = result;
  //     if (this.deleteProfile) {
  //       this.myprofileService.deleteProfile(content).toPromise().then(
  //         data => {
  //           this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
  //           this.logout();
  //         },
  //
  //         error => {
  //           // If error is not a string received from the API, handle the ProgressEvent
  //           // returned due to the inability to connect to the API by printing an appropriate
  //           // warning message
  //           if (typeof (error) !== 'string') {
  //             this.alertService.error('Error: No connection to the API');
  //           } else {
  //             this.alertService.error(error);
  //           }
  //         });
  //     }
  //   });
  // }

  /***
   * Logs out the user and redirects him to the main paige
   */
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }


}













//   /*Updates the user's details in the database according to his changes*/
//   onClickUpdate() {
//     this.error = false;
//     let content;
//     if (this.detailsEntryForm.valid && this.detailsEntryForm.dirty) {
//       this.fieldChanged = true;
//     }
//     if (this.passwordEntryForm.dirty) {
//       this.newPassword = this.passwordEntryForm.get('newPassword').value;
//       this.repeatedPassword = this.passwordEntryForm.get('repeatedPassword').value;
//       this.password = this.passwordEntryForm.get('password').value;
//       console.log(this.repeatedPassword);
//       if (this.password == null) {
//         this.alertService.error('Give your old password');
//         this.error = true;
//       } else if (this.password != null && this.newPassword != this.repeatedPassword && this.newPassword != null && this.repeatedPassword != null) {
//         // if the user didn't give same new password and new repeated password,
//         // it shows an alert message with the relevant content
//         this.alertService.error('New password and new repeated password are not same');
//         this.error = true;
//       } else if (this.password != null && this.newPassword == this.repeatedPassword && this.newPassword != null && this.repeatedPassword != null) {
//         this.passwordChanged = true;
//       } else if (this.password != null && this.newPassword != null && this.repeatedPassword == null) {
//         this.alertService.error('Enter the new password again');
//         this.error = true;
//       } else if (this.password != null && this.newPassword == null && this.repeatedPassword != null) {
//         this.alertService.error('Enter the new password ');
//         this.error = true;
//       } else if (this.password != null && this.newPassword == null && this.repeatedPassword == null) {
//         this.alertService.error('Give a new password');
//         this.error = true;
//       }
//     }
//     if (this.error == false && this.passwordChanged == true && this.fieldChanged == true) {
//       content = {
//         passwordChanged: true, fieldChanged: true,
//         userJson: {
//           _id: this.jsonData._id, email: this.detailsEntryForm.get('email').value, name: this.detailsEntryForm.get('name').value,
//           surname: this.detailsEntryForm.get('lastName').value, birthdate: new DatePipe('en').transform(this.detailsEntryForm.get('birthDate').value, 'dd/MM/yyyy'),
//           password: this.passwordEntryForm.get('password').value
//         },
//         passwordJson: {
//           user: { email: this.detailsEntryForm.get('email').value, password: this.passwordEntryForm.get('password').value },
//           new_password: this.passwordEntryForm.get('newPassword').value
//         }
//       };
//       this.myprofileService.updateChanges(content).toPromise().then(data => {
//         this.alertService.success(data); // in case of successful request it shows an alert message with the relevant content
//       },
//         error => { // if the request returns an error, it shows an alert message with the relevant content
//           this.alertService.error(error);
//           this.error = true;
//         });
//     } else if (this.error == false && this.passwordChanged == false && this.fieldChanged == true) {
//       console.log(this.detailsEntryForm.get('name').value);
//       content = {
//         passwordChanged: false, fieldChanged: true,
//         userJson: {
//           _id: this.jsonData._id, email: this.detailsEntryForm.get('email').value, name: this.detailsEntryForm.get('name').value,
//           surname: this.detailsEntryForm.get('lastName').value, birthdate: new DatePipe('en').transform(this.detailsEntryForm.get('birthDate').value, 'dd/MM/yyyy'),
//           password: this.password
//         }
//       };
//       this.myprofileService.updateChanges(content).toPromise().then(data => {
//         this.alertService.success(data);
//       },
//         error => {
//           this.alertService.error(error);
//           this.error = true;
//         });
//     } else if (this.error == false && this.detailsEntryForm.valid && this.passwordEntryForm.valid && this.passwordChanged == true && this.fieldChanged == false) {
//       content = {
//         passwordChanged: true, fieldChanged: false,
//         passwordJson: {
//           user: { email: this.detailsEntryForm.get('email').value, password: this.passwordEntryForm.get('password').value },
//           new_password: this.passwordEntryForm.get('newPassword').value
//         }
//       };
//       this.myprofileService.updateChanges(content).toPromise().then(data => {
//         this.alertService.success(data);
//       },
//         error => {
//           this.alertService.error(error);
//           this.error = true;
//         });
//     } else if (!this.detailsEntryForm.dirty && !this.passwordEntryForm.dirty) {
//       this.alertService.error('You haven\'t changed anything');
//     }
//   }
//
// }
//
