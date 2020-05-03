import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
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
    console.log('form.hasError(\'passwordMismatch\'): ' + form.hasError('passwordMismatch'));
    console.log('return: ' + form.hasError('passwordMismatch'));

    return form.hasError('passwordMismatch');
  }
}

// const MatchingPasswordsValidator: ValidatorFn = (fg: FormGroup) => {
//   const password = fg.get('password').value;
//   const repeatPassword = fg.get('repeatPassword').value;
//   return password !== null && repeatPassword !== null && start < end ? null : { range: true };
// };

function matchingPasswordsValidator(group: FormGroup): { [key: string]: boolean } | null {
  if (group.get('password').value !== group.get('repeatPassword').value) {
    console.log('mpika ston custom validator');
    return {passwordMismatch : true};
  }
  return null;
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
    passwords: new FormGroup({
        password: new FormControl('', [
          Validators.required,
        ]),
        repeatPassword: new FormControl('', [
          Validators.required,
        ])
      }, [matchingPasswordsValidator])
    }
  );

  genericErrorStateMatcher = new GenericErrorStateMatcher();
  passwordsErrorStateMatcher = new PasswordsErrorStateMatcher();
  alertSubscription: Subscription;
  alertMessage = '';

  loading = false;

  // getErrorMessage() {
  //   if (this.emailFormControl.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  // }

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
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

  passwordsMatch(): boolean {
    if (!(this.registerForm.get('password').hasError('required') &&
      this.registerForm.get('repeatPassword').hasError('required'))) {
      // Check if password and repeat password match
      console.log(this.registerForm.get('password').value);
      console.log(this.registerForm.get('repeatPassword').value);
      console.log('passwordsMatch(): ' + this.registerForm.get('password').value === this.registerForm.get('repeatPassword').value);
      return this.registerForm.get('password').value === this.registerForm.get('repeatPassword').value;
    }
  }

  onSubmit(): void {
    // if (!this.registerForm.get('firstName').hasError('required') &&
    //   !this.registerForm.get('lastName').hasError('required') &&
    //   !(this.registerForm.get('email').hasError('required') &&
    //   this.registerForm.get('email').hasError('email')) &&
    //   this.passwordsMatch()) {
    //
    // }
    console.log('onSubmit() this.registerForm.get(\'passwords\').hasError(\'passwordMismatch\') : ' + this.registerForm.get('passwords').hasError('passwordMismatch'));

  }
}
