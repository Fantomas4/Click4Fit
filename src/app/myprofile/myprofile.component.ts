import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyProfileService} from './myprofile.delete.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  firstName: string='Giorgos';
  lastName: string='Papadopoulos';
  date = new FormControl(new Date(1997,3,24));
  registrationEmail: string ='giorgospapad@gmail.com';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  initialPassword: string = 'gp123456';
  repeatedPassword: string = 'gp123456';

  constructor(public deleteService:MyProfileService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  change(){

  }
  onClick(){
    this.deleteService.openModal();
  }
  
}
