import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogMessageComponent} from '../dialog-message/dialog-message.component';
import { Router } from '@angular/router';

@Injectable()
export class MyProfileService {
    router: Router;
    constructor(public dialog: MatDialog) { }

    openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 400;
        const dialogRef = this.dialog.open(DialogMessageComponent, dialogConfig);
        dialogRef.afterClosed().subscribe();
      }


}
