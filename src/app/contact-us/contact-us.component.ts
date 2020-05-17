
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ContactUsService} from './contact-us.service';
import {FormControl, Validators} from '@angular/forms';

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

  constructor(public contactUsService: ContactUsService) {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.content={'fullname':this.fullName,'email':this.contactEmail,'telephone':this.telephone,'subject':this.subject,'text':this.textarea};
    this.contanctUsService.postDetails(this.content);
    this.contanctUsService.openModal();
  }
}
