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
import {RegistrationService} from './registration.service';
import {first} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

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
    birthDate: new FormControl(),
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

  selectedType = 'client';

  genericErrorStateMatcher = new GenericErrorStateMatcher();
  passwordsErrorStateMatcher = new PasswordsErrorStateMatcher();
  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  loading = false;


  constructor(private alertService: AlertService, private registrationService: RegistrationService) { }

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
    console.log(new DatePipe('en').transform(this.registerForm.get('birthDate').value, 'dd/MM/yyyy'));
    console.log(JSON.stringify(new DatePipe('en').transform(this.registerForm.get('birthDate').value, 'dd/MM/yyyy')));
    if (this.registerForm.valid) {
      this.loading = true;

      let postData: object;

      if (this.registerForm.get('birthDate').value !== null) {
        postData = {
          name: this.registerForm.get('firstName').value,
          surname: this.registerForm.get('lastName').value,
          birthdate: new DatePipe('en').transform(this.registerForm.get('birthDate').value, 'dd/MM/yyyy'),
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('password').value,
          privilegeLevel: this.selectedType
        };
      } else {
        postData = {
          name: this.registerForm.get('firstName').value,
          surname: this.registerForm.get('lastName').value,
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('password').value,
          privilegeLevel: this.selectedType
        };
      }

      this.registrationService.register(postData).pipe(first()).subscribe(
          data => {
            this.alertService.success(data.body);
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });

      // Reset form group's input fields
      this.registerForm.reset();
    }
  }
}
