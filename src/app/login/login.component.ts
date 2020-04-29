import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = '';
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  password = '';
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  customErrorMatcher = new CustomErrorStateMatcher();

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {


  }

  onSubmit(): void {
    console.log(this.username);
    console.log(this.password);
    // if (this.username === 'admin' && this.password === 'admin') {
    //   this.router.navigate(['user']);
    // } else {
    //   this.message = 'Invalid credentials';
    // }

    console.log(this.username.length);
    console.log(this.password.length);
    if (!this.usernameFormControl.hasError('required') &&
      !this.passwordFormControl.hasError('required')) {
      this.authenticationService.login(this.username, this.password);
    } else {
      // ????
    }
  }
}

