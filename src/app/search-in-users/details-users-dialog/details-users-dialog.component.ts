import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersEntry} from '../../users-entry';


@Component({
  selector: 'app-details-users-dialog',
  templateUrl: './details-users-dialog.component.html',
  styleUrls: ['./details-users-dialog.component.css']
})
export class DetailsUsersDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsUsersDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UsersEntry) { }

  onCloseClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
