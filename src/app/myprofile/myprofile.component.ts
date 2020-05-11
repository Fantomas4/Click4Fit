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
  newPassword:string;
  newRepeatedPassword:string;
  content;
  results;
  picker;
  emailuser;
  id:string;

  constructor(public myprofileService: MyProfileService) { }

  ngOnInit(): void {
    this.emailuser={"email":"gandrian@gmail.com"};
    this.myprofileService.postUser(this.emailuser).subscribe((data:any)=>
    {
      if (data.response==200){
        this.results=data.user;
        this.id=this.results._id;
        console.log(this.id);
        this.name=this.results.name;
        this.surname=this.results.surname;
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
    this.content={"_id":this.id,"name":this.name,"surname":this.surname,"email":this.email,"password":this.newPassword,"birthdate":this.results.birthdate};
    this.myprofileService.openModalDelete(this.content);
  }
   /*Updates the user's details in the database according to his changes*/
  onClickUpdate(){
    this.myprofileService.postPassword(this.password).toPromise().then((data:any)=>{
      if (data.response==200){
        if (this.newPassword==this.newRepeatedPassword){
          this.content={"_id":this.id,"name":this.name,"surname":this.surname,"email":this.email,"password":this.newPassword,"birthdate":this.birthdate};
          this.myprofileService.postChanges(this.content).toPromise().then((data:any)=>{
            if (data.response==200){
              this.myprofileService.openModalUpdate();
            }
          });
        }
        else{
          //alert service for new password
        }
      }
      else{
          //alert service for old password
      }
    });
  }
}
