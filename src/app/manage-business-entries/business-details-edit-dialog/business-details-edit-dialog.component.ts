import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../../business-entry';
import {FormControl, Validators} from '@angular/forms';
import {BusinessDetailsEditDialogService} from './business-details-edit-dialog.service';

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './business-details-edit-dialog.component.html',
  styleUrls: ['./business-details-edit-dialog.component.css']
})
export class BusinessDetailsEditDialogComponent implements OnInit {

  id: number; // The displayed entry's id.
  name: string; // The displayed entry's name.
  category: string; // The displayed entry's category.
  country: string; // The displayed entry's country location.
  city: string; // The displayed entry's city location.
  address: string; // The displayed entry's address location.
  postal_code: string; // The displayed entry's postalCode location.
  phone_number: string; // The displayed entry's phone number.
  services: string[]; // List containing the titles of the available services offered by the displayed entry.
  products: string[]; //List containing the titles of the available products offered by the displayed entry.
  img_path: string; // String containing the path for the preview image of the displayed entry.
  email:string; //The displayes entry's email.

  // Form Control used to receive and validate the user's email input.
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<BusinessDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private editDetailsService: BusinessDetailsEditDialogService) {}

  ngOnInit(): void {
    // Extract the data from the payload and store it into the class properties
    this.id = this.data._id;
    this.name = this.data.name;
    this.category = this.data.category;
    this.country = this.data.country;
    this.city = this.data.city;
    this.address = this.data.address;
    this.postal_code = this.data.postal_code;
    this.phone_number = this.data.phone_number;
    this.email=this.data.email;
    this.services=this.data.services;
    this.products=this.data.products;
    this.img_path = this.data.img_path;
  }

  /**
   *  Retrieves and returns any errors that have occurred in
   *  the email Form Control.
   */
  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * Called to close the "Edit/Details" dialog window.
   */
  onCloseClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close();
  }

  onSaveClick(): void {
    var content = {'id':this.id,'name':this.name,'category':this.category,'country':this.country,
    'city':this.city,'address':this.address,'postal_code':this.postal_code,'phone_number':this.phone_number,
    'email':this.email};
    this.editDetailsService.postDetails(content).toPromise().then((data:any)=>{
      if (data.response==200){
        //show message everything has saved
      }
      else{
        //show message with the error
      }
    });
  }
}
