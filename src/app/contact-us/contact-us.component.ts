import { Component, OnInit } from '@angular/core';
import {ContactUsService} from './contact-us.service';
import {FormControl, Validators} from '@angular/forms';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  title = "Contact Us"
  content;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  fullName: string;
  telephone: string;
  date: FormControl;
  contactEmail: string;
  textarea: string;
  subject: string;
  alertMessage: AlertMessage;
  alertSubscription: Subscription;

  constructor(public contanctUsService:ContactUsService,private alertService: AlertService) { }

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
    this.content={'fullname':this.fullName,'email':this.contactEmail,'telephone':this.telephone,'subject':this.subject,'text':this.textarea};
    this.contanctUsService.postDetails(this.content);
    this.alertService.success("Your message has been sent.")
  }
}
