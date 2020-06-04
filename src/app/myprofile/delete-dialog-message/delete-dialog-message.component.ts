import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-message',
  templateUrl: './delete-dialog-message.component.html',
  styleUrls: ['./delete-dialog-message.component.css']
})
export class DeleteDialogMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  clickedYes: boolean = false;

  ngOnInit(): void { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  deleteProfile() {
    this.clickedYes = true;
    this.dialogRef.close(this.clickedYes); // it passes to the myprofile component the choice of user about
                                           //deleting his profile or not after closing of dialog message
  }
}

