import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../../business-entry';
import {BusinessAddEntryDialogService} from './business-add-entry-dialog.service';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './business-add-entry-dialog.component.html',
  styleUrls: ['./business-add-entry-dialog.component.css']
})
export class BusinessAddEntryDialogComponent implements OnInit {

  id: number;
  name: string;
  category: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  availableServProd: string[];
  imgPath: string;
  email;

  constructor(public dialogRef: MatDialogRef<BusinessAddEntryDialogComponent>,private addEntryService: BusinessAddEntryDialogService) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close();
  }

  onSaveClick(): void {
    var content = {"_id":this.id,"name":this.name,"category":this.category,"country":this.country,
    "city":this.city,"address":this.address,"postal_code":this.postalCode,"phone_number":this.phoneNumber,
    "email":this.email};
    this.addEntryService.postDetails(content).toPromise().then((data:any)=>{
      console.log(data.msg);
      if (data.response==200){
        //alert service
        console.log('okey');
      }
      else{
        //show message with the error
      }
    });
  }

}
