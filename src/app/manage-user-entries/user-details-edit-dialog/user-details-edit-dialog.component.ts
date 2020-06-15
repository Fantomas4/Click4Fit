import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-details-edit-dialog',
  templateUrl: './user-details-edit-dialog.component.html',
  styleUrls: ['./user-details-edit-dialog.component.css']
})
export class UserDetailsEditDialogComponent implements OnInit {
  
  entryForm = new FormGroup( {
    name: new FormControl('', [
      Validators.required
    ]),
    surname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    birthdate: new FormControl('', [
      Validators.required
    ])
    },
  );

  genericErrorStateMatcher = new GenericErrorStateMatcher();

  clickedSave:boolean;
  id: number;

  constructor(public dialogRef: MatDialogRef<UserDetailsEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.id=this.data._id;
    this.entryForm.setValue({
      name: this.data.name,
      surname: this.data.surname,
      email: this.data.email,
      birthdate: this.data.birthdate
    });
  }

  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    if (this.entryForm.valid) {
      const content = {
        ownerId: JSON.parse(sessionStorage.getItem('currentUser'))._id,
        name: this.entryForm.get('name').value,
        surname:this.entryForm.get('surname').value,
        email: this.entryForm.get('email').value,
        birthdate:this.entryForm.get('birthdate').value
      };
      this.dialogRef.close({clickedSave: true, details: content});
    }
  }


}
