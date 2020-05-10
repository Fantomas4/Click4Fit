import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyProfileService} from './myprofile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  name: string;
  surname: string;
  birthdate: FormControl;
  email: string;
  password: string;
  repeatedPassword: string;
  content;
  results;
  picker;

  constructor(public myprofileService: MyProfileService) { }

  ngOnInit(): void {
    this.myprofileService.postUser(this.email).subscribe((data:any)=>
    {
      if (data.response==200){
        this.results=data.user;
        this.name=this.results.name;
        this.surname=this.results.surname;
        this.password=this.results.password;
        this.repeatedPassword=this.results.password;
        this.email=this.results.email;
        this.birthdate=new FormControl(new Date(this.results.birthdate));
      }
    });
    /*this.firstName = this.myprofileResults[0].name;
    this.lastName = this.myprofileResults[0].lastname;
    this.initialPassword = this.myprofileResults[0].password;
    this.repeatedPassword = this.myprofileResults[0].password;
    this.registrationEmail = this.myprofileResults[0].email;
    this.date = new FormControl(new Date(this.myprofileResults[0].birthdate));*///it shows the date in a calendar 
  }

  /*Checks if the email form has been completed or if the email is valid*/
  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  /*Shows modal message after click on delete account button*/
  onClickDelete() {
    console.log(this.email);
    this.myprofileService.openModalDelete(this.email);
  }
   /*Updates the user's details in the database according to his changes*/
  onClickUpdate(){
    this.content={'name':this.name,'surname':this.surname,'email':this.email,'password':this.password,'birthdate':this.birthdate};
    this.myprofileService.postChanges(this.content).toPromise().then((data:any)=>{});
    this.myprofileService.openModalUpdate();
  }
}
