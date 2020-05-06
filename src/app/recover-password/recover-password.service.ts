import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {RecoverDialogMessageComponent} from './recover-dialog-message/recover-dialog-message.component';

@Injectable()
export class RecoverPasswordService {

    constructor(public dialog: MatDialog) { }

    /*Creates a modal message and determines its parameters */
    openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        const dialogRef = this.dialog.open(RecoverDialogMessageComponent, dialogConfig);
        dialogRef.afterClosed().subscribe();
      }
}