import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  customErrorMatcher = new CustomErrorStateMatcher();
  authErrorMessage = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onSubmit(): void {

    console.log(this.loginForm.get('username'));
    console.log(this.loginForm.get('password'));

    if (!this.loginForm.get('username').hasError('required') &&
      !this.loginForm.get('password').hasError('required')) {

      this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
      this.authErrorMessage = 'Error: Could not authenticate';
    }
  }
}

