import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyProfileDeleteService} from './myprofile.delete.service';
import {PROFILEENTRIES} from '../mock-database';
import {MyProfileEntry} from '../myprofile-entry';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  myprofileResults=PROFILEENTRIES;
  myProfileData:MyProfileEntry;


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstName: string;
  lastName: string;
  date: FormControl;
  registrationEmail: string;
  initialPassword: string;
  repeatedPassword: string;

  constructor(public deleteService: MyProfileDeleteService) { }

  ngOnInit(): void {
    this.firstName=this.myprofileResults[0].name;
    this.lastName=this.myprofileResults[0].lastname;
    this.initialPassword=this.myprofileResults[0].password;
    this.repeatedPassword=this.myprofileResults[0].password;
    this.registrationEmail=this.myprofileResults[0].email;
    this.date=new FormControl(new Date(this.myprofileResults[0].birthdate));
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  change() {

  }
  onClick() {
    this.deleteService.openModal();
  }

}