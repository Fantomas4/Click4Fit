import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
}

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './my-business-details-edit-dialog.component.html',
  styleUrls: ['./my-business-details-edit-dialog.component.css']
})

export class MyBusinessDetailsEditDialogComponent implements OnInit {

  id: number; // The displayed entry's id.
  name: string; // The displayed entry's name.
  category: string; // The displayed entry's category.
  country: string; // The displayed entry's country location.
  city: string; // The displayed entry's city location.
  address: string; // The displayed entry's address location.
  postalCode: string; // The displayed entry's postalCode location.
  phoneNumber: string; // The displayed entry's phone number.
  services: string[]; // List containing the titles of the available services offered by the displayed entry.
  products: string[]; // List containing the titles of the available products offered by the displayed entry.
  imgFile: string; // String containing the path for the preview image of the displayed entry.
  email: string; // The displayes entry's email.
  clickedSave: boolean;

  // Form Control used to receive and validate the user's email input.
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  // Chip list options
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(public dialogRef: MatDialogRef<MyBusinessDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // Extract the data from the payload and store it into the class properties
    this.id = this.data._id;
    this.name = this.data.name;
    this.category = this.data.category;
    this.country = this.data.country;
    this.city = this.data.city;
    this.address = this.data.address;
    this.postalCode = this.data.postalCode;
    this.phoneNumber = this.data.phoneNumber;
    this.email = this.data.email;
    this.services = this.data.services;
    this.products = this.data.products;
    this.imgFile = this.data.imgPath;
  }

  onFileSelected(event) {
    console.log(event);
    this.imgFile = event.files.target[0];
  }

  addServiceChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our service
    if ((value || '').trim()) {
      this.services.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeServiceChip(service: string): void {
    const index = this.services.indexOf(service);

    if (index >= 0) {
      this.services.splice(index, 1);
    }
  }

  addProductChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our service
    if ((value || '').trim()) {
      this.products.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeProductChip(product: string): void {
    const index = this.products.indexOf(product);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
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

  onCountrySelected($event: Country) {
    this.country = $event.name;
  }

  /**
   * Called to close the "Edit/Details" dialog window.
   */
  onCloseClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    const content = {
      _id: this.id,
      name: this.name,
      category: this.category,
      country: this.country,
      city: this.city,
      address: this.address,
      postalCode: this.postalCode,
      phoneNumber: this.phoneNumber,
      services: this.services,
      products: this.products,
      imgPath: this.imgFile,
      email: this.email
    };
    this.dialogRef.close({clickedSave: true, details: content});
  }
}
