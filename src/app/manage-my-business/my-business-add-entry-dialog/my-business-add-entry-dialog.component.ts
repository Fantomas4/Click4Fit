import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ErrorStateMatcher} from '@angular/material/core';

interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
}

export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // console.log(control);
    // console.log(form);
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './my-business-add-entry-dialog.component.html',
  styleUrls: ['./my-business-add-entry-dialog.component.css']
})
export class MyBusinessAddEntryDialogComponent implements OnInit {
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
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    },
  );

  genericErrorStateMatcher = new GenericErrorStateMatcher();


  id: number;
  category = 'gym';
  country = 'Greece'; // The default country value is set to 'Greece'
  services = [];
  products = [];
  imgFile = null;

  clickedSave: boolean;

  // Chip list options
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(public dialogRef: MatDialogRef<MyBusinessAddEntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

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

  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    if (this.entryForm.valid) {
      const content = {
        // ownerId: JSON.parse(sessionStorage.getItem('currentUser'))
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
        email: this.entryForm.get('email').value
      };
      console.log('onSaveClick result: ', content);
      this.dialogRef.close({clickedSave: true, details: content});
    }
  }
}
