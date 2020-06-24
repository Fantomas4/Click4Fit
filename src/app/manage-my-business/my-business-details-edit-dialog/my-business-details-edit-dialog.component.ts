import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ErrorStateMatcher} from '@angular/material/core';

interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
}

export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './my-business-details-edit-dialog.component.html',
  styleUrls: ['./my-business-details-edit-dialog.component.css']
})

export class MyBusinessDetailsEditDialogComponent implements OnInit {
  entryForm = new FormGroup( {
      name: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      postalCode: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]*')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    },
  );

  genericErrorStateMatcher = new GenericErrorStateMatcher();

  id: number; // The displayed entry's id.
  category: string; // The displayed entry's category.
  country: string; // The displayed entry's country location.
  services: string[]; // List containing the titles of the available services offered by the displayed entry.
  products: string[]; // List containing the titles of the available products offered by the displayed entry.
  imgFile = null; // Contains the data for the preview image selected (on edit) for the displayed entry.
  imgPath: string; // Contains the image path for the preview image currently associated with the displayed entry.

  clickedSave: boolean;

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
    this.entryForm.setValue({
      name: this.data.name,
      city: this.data.city,
      address: this.data.address,
      postalCode: this.data.postalCode,
      phoneNumber: this.data.phoneNumber,
      email: this.data.email
    });
    this.category = this.data.category;
    this.country = this.data.country;
    this.services = this.data.services;
    this.products = this.data.products;
    this.imgPath = this.data.imgPath;
  }

  onFileSelected(event) {
    this.imgFile = event.target.files[0];
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

  onCountrySelected($event: Country) {
    this.country = $event.name;
  }

  /**
   * Called to close (discard) the "Edit/Details" dialog window.
   */
  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    if (this.entryForm.valid) {
      const content = {
        _id: this.id,
        name: this.entryForm.get('name').value,
        category: this.category,
        country: this.country,
        city: this.entryForm.get('city').value,
        address: this.entryForm.get('address').value,
        postalCode: this.entryForm.get('postalCode').value,
        phoneNumber: this.entryForm.get('phoneNumber').value,
        services: this.services,
        products: this.products,
        file: this.imgFile,
        imgPath: this.imgPath,
        email: this.entryForm.get('email').value
      };
      this.dialogRef.close({clickedSave: true, details: content});
    }
  }
}
