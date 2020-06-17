import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

interface AlertMessage {
  type: string;
  text: string;
}
export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  entryForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('', [
      Validators.required
    ]),
    subject: new FormControl('', [
      Validators.required
    ]),
    text: new FormControl('', [
      Validators.required
    ]),
  });

  title = 'Contact Us';
  content;
  genericErrorStateMatcher = new GenericErrorStateMatcher();
  alertMessage: AlertMessage;
  alertSubscription: Subscription;

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

  onClick() {
      this.alertService.success("Your message has been sent.")
    
  }
}
