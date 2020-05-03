import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogMessageComponent} from './dialog-message/dialog-message.component';
import {DialogMessageBComponent} from './dialog-message-b/dialog-message-b.component';

/*This service is about showing an alert modal message to confirm the user's willing for deleting
his account*/
@Injectable()
export class MyProfileService {

    constructor(public dialog: MatDialog) { }

    /*Creates a modal message and determines its parameters */
    openModalDelete() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        const dialogRef = this.dialog.open(DialogMessageComponent, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }
    openModalUpdate() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = 100;
      const dialogRef = this.dialog.open(DialogMessageBComponent, dialogConfig);
      dialogRef.afterClosed().subscribe();
  }
}

