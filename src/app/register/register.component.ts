import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;

  registrationEmail: string;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  initialPassword: string;
  repeatedPassword: string;

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  register() {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
