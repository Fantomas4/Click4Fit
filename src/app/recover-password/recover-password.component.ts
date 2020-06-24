import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroupDirective, NgForm, FormGroup} from '@angular/forms';
import {AlertService} from '../core/alert.service';
import {Subscription} from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
/**
 * Interface used to store received messages from alert service.
 */
interface AlertMessage {
  type: string;
  text: string;
}
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoveryEmail: string;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  alertSubscription: Subscription;
  alertMessage: any;
  customErrorMatcher = new CustomErrorStateMatcher();

  constructor(private alertService: AlertService) { }

  recoverForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

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

  onClick() {
    if (this.recoverForm.valid){
      this.alertService.success('A recovery message has been sent to the provided email address.');
    }
  }
}
