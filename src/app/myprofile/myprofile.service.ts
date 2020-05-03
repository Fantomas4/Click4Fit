import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogMessageComponent} from './dialog-message/dialog-message.component';

/*This service is about showing an alert modal message to confirm the user's willing for deleting
his account*/
@Injectable()
export class MyProfileService {

    constructor(public dialog: MatDialog) { }

    /*Creates a modal message and determines its parameters */
    openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        const dialogRef = this.dialog.open(DialogMessageComponent, dialogConfig);
        dialogRef.afterClosed().subscribe();
      }
}

