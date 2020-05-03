import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogMessage3Component} from './dialog-message3/dialog-message3.component';

@Injectable()
export class ContactUsService {

    constructor(public dialog: MatDialog) { }

     /*Creates a modal message and determines its parameters */
     openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        const dialogRef = this.dialog.open(DialogMessage3Component, dialogConfig);
        dialogRef.afterClosed().subscribe();
      }
}