import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    console.log(isSubmitted);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // @ViewChild('loginForm') loginForm: FormGroupDirective;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });


  // usernameFormControl = new FormControl('', [
  //   Validators.required
  // ]);

  // passwordFormControl = new FormControl('', [
  //   Validators.required
  // ]);

  customErrorMatcher = new CustomErrorStateMatcher();

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {


  }

  onSubmit(): void {

    console.log(this.loginForm.get('username'));
    console.log(this.loginForm.get('password'));

    // console.log(this.username.length);
    // console.log(this.password.length);
    // if (!this.usernameFormControl.hasError('required') &&
    //   !this.passwordFormControl.hasError('required')) {
    //   this.authenticationService.login(this.username, this.password);
    // } else {
    //   // ????
    // }
  }
}

