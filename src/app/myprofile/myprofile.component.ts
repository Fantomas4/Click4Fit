import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyProfileDeleteService} from './myprofile.delete.service';
import {USERENTRIES} from '../mock-database';
import {UserEntry} from '../user-entry';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  myprofileResults = USERENTRIES;
  myProfileData: UserEntry;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstName: string;
  lastName: string;
  date: FormControl;
  registrationEmail: string;
  initialPassword: string;
  repeatedPassword: string;

  constructor(public deleteService: MyProfileDeleteService) { }

  ngOnInit(): void {
    this.firstName = this.myprofileResults[0].name;
    this.lastName = this.myprofileResults[0].lastname;
    this.initialPassword = this.myprofileResults[0].password;
    this.repeatedPassword = this.myprofileResults[0].password;
    this.registrationEmail = this.myprofileResults[0].email;
    this.date = new FormControl(new Date(this.myprofileResults[0].birthdate)); //it shows the date in a calendar 
  }

  /*Checks if the email form has been completed or if the email is valid*/
  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  /*Updates the user's details in the database according to his changes*/
  change() {

  }
  /*Shows modal message after click on delete account button*/
  onClick() {
    this.deleteService.openModal();
  }
}
