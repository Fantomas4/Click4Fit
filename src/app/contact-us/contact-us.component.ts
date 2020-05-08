
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ContactUsService} from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  title = 'Contact Us'
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  fullName: string;
  telephone: string;
  date: FormControl;
  contactEmail: string;
  textarea: string;
  subject: string;
  
  constructor(public contanctUsService:ContactUsService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';

  onClick() {
    this. contanctUsService.openModal();
  }
}
