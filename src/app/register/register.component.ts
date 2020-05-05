import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../core/alert.service';

export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // console.log(control);
    // console.log(form);
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class PasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // console.log(control);
    // console.log(form);
    // console.log('form.hasError(\'passwordMismatch\'): ' + form.hasError('passwordMismatch'));
    // console.log('return: ' + form.hasError('passwordMismatch'));

    return !!(form.hasError('passwordMismatch') || control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function matchingPasswordsValidator(group: FormGroup): { [key: string]: boolean } | null {
  if ((group.get('password').value !== '' && group.get('repeatPassword').value !== '') &&
      group.get('password').value !== group.get('repeatPassword').value) {
    return {passwordMismatch : true};
  }
  return null;
}

/**
 * Interface used to store received messages from alert service.
 */
interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {
  registerForm = new FormGroup( {
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
    ]),
    }, [matchingPasswordsValidator]
  );

  genericErrorStateMatcher = new GenericErrorStateMatcher();
  passwordsErrorStateMatcher = new PasswordsErrorStateMatcher();
  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  loading = false;


  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
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
    if (this.registerForm.valid) {
      this.loading = true;
    }
    this.loading = false;
  }
}
