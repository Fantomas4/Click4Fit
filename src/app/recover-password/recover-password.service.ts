import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogMessage2Component} from './dialog-message2/dialog-message2.component';

@Injectable()
export class RecoverPasswordService {

    constructor(public dialog: MatDialog) { }

    /*Creates a modal message and determines its parameters */
    openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        const dialogRef = this.dialog.open(DialogMessage2Component, dialogConfig);
        dialogRef.afterClosed().subscribe();
      }
}