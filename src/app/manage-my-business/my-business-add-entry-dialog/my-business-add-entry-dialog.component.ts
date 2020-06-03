import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
}

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './my-business-add-entry-dialog.component.html',
  styleUrls: ['./my-business-add-entry-dialog.component.css']
})
export class MyBusinessAddEntryDialogComponent implements OnInit {

  id: number;
  name: string;
  category = 'gym';
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  services = [];
  products = [];
  imgFile = null;
  email;
  clickedSave: boolean;

  // Chip list options
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(public dialogRef: MatDialogRef<MyBusinessAddEntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

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

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  onCountrySelected($event: Country) {
    this.country = $event.name;
  }

  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    const content = {
    user: {
      _id: (JSON.parse(sessionStorage.getItem('currentUser')))._id
    },
    business: {
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
      email: this.email}
    };
    this.dialogRef.close({clickedSave: true, details: content});
  }

}
