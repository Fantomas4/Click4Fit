import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DeleteDialogMessageComponent} from './delete-dialog-message/delete-dialog-message.component';
import {UpdateDialogMessageComponent} from './update-dialog-message/update-dialog-message.component';

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
        const dialogRef = this.dialog.open(DeleteDialogMessageComponent, dialogConfig);
        dialogRef.afterClosed().subscribe();
    }
    openModalUpdate() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = 100;
      const dialogRef = this.dialog.open(UpdateDialogMessageComponent, dialogConfig);
      dialogRef.afterClosed().subscribe();
  }
}

