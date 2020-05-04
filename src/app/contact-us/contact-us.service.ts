import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ContactUsDialogMessageComponent} from './contactus-dialog-message/contactus-dialog-message.component';

@Injectable()
export class ContactUsService {

    constructor(public dialog: MatDialog) { }

     /*Creates a modal message and determines its parameters */
     openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        const dialogRef = this.dialog.open(ContactUsDialogMessageComponent, dialogConfig);
        dialogRef.afterClosed().subscribe();
      }
}