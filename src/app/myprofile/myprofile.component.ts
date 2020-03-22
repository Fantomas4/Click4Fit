import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyProfileService} from './myprofile.delete.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstName: string;
  lastName: string;
  date: string;
  registrationEmail: string;
  initialPassword: string;
  repeatedPassword: string;

  constructor(public deleteService: MyProfileService) { }

  ngOnInit(): void {
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
