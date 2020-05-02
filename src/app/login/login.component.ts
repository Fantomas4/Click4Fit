import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertService} from '../core/alert.service';
import {Subscription} from 'rxjs';

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

export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  customErrorMatcher = new CustomErrorStateMatcher();
  alertSubscription: Subscription;
  alertMessage = '';

  loading = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value.type === 'error') {
        console.log(value.text);
        this.alertMessage = value.text;
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.loginForm.get('email'));
    console.log(this.loginForm.get('password'));

    if (!(this.loginForm.get('email').hasError('required') &&
      this.loginForm.get('email').hasError('email')) &&
      !this.loginForm.get('password').hasError('required')) {

      // Update loading flag value for mat-spinner
      this.loading = true;
      this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      // this.alertMessage = 'Error: Could not authenticate';
      this.alertSubscription.unsubscribe();
      console.log(this.authenticationService.currentUserValue);
      if (this.authenticationService.currentUserValue.privilegeLevel === 'client') {
        // The user currently logged in has the access privilege level of a client
        this.router.navigate(['/user']);
      } else if (this.authenticationService.currentUserValue.privilegeLevel === 'admin') {
        this.alertSubscription.unsubscribe();
        this.router.navigate(['/admin']);
      }
    }
    this.loading = false;
  }
}

