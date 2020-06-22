import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertService} from '../core/alert.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Interface used to store received messages from alert service.
 */
interface AlertMessage {
  type: string;
  text: string;
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
  alertMessage: AlertMessage;

  loading = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  onSubmit(): void {

    if (this.loginForm.valid) {
      // Update loading flag value for mat-spinner
      this.loading = true;

      this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).
      pipe(first()).subscribe(
        data => {
          if (this.authenticationService.currentUserValue.privilegeLevel === 'client') {
            // The user currently logged in has the access privilege level of a client
            this.router.navigate(['/user']);
          } else if (this.authenticationService.currentUserValue.privilegeLevel === 'admin') {
            this.alertSubscription.unsubscribe();
            this.router.navigate(['/admin']);
          } else if (this.authenticationService.currentUserValue.privilegeLevel === 'business') {
            this.alertSubscription.unsubscribe();
            this.router.navigate(['/business-owner']);
          }
        },
        error => {
          // If error is not a string received from the API, handle the ProgressEvent
          // returned due to the inability to connect to the API by printing an appropriate
          // warning message
          if (typeof(error) !== 'string') {
            this.alertService.error('Error: No connection to the API');
          } else {
            this.alertService.error(error);
            this.loading = false;
          }
        }
      );
    }
  }
}

