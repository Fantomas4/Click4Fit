import { Component, OnInit } from '@angular/core';
import {ContactUsService} from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  title = "Contact Us"

  constructor(public contanctUsService:ContactUsService) { }

  ngOnInit(): void {
  }
  onClick() {
    this. contanctUsService.openModal();
  }
}
