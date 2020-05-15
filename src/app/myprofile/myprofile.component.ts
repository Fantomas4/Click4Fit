import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyProfileService} from './myprofile.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  providers: [
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
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

  constructor(public myprofileService: MyProfileService,private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this._adapter.setLocale('en');
    this.emailuser={"email":"gandrian@gmail.com"};
    this.myprofileService.postUser(this.emailuser).subscribe((data:any)=>
    {
      if (data.response==200){
        this.results=data.user;
        this.id=this.results._id;
        this.name=this.results.name;
        this.surname=this.results.surname;
        this.email=this.results.email;
        this.birthdate=new FormControl(new Date(this.results.birthdate));
      }
    });
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
    console.log(this.newPassword);
    console.log(this.newRepeatedPassword);
    if (this.newPassword==this.newRepeatedPassword){
      this.content={"user": {"email":this.email,"password":this.password}, "new_password":this.newPassword};
      this.myprofileService.postChanges(this.content).toPromise().then((data:any)=>{
        console.log(data.msg);
        if (data.response==200){
            this.myprofileService.openModalUpdate();
        }
        else{
          console.log('wrong');
          //alert service for wrong old password
        }
      });  
    }
    else{
      console.log('newpassword!=newRepeatedPassowrd');
      //alert service for wrong new password and new repeated
    }
  }
}
