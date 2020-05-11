import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DeleteDialogMessageComponent} from './delete-dialog-message/delete-dialog-message.component';
import {UpdateDialogMessageComponent} from './update-dialog-message/update-dialog-message.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';

/*This service is about showing an alert modal message to confirm the user's willing for deleting
his account*/
@Injectable()
export class MyProfileService {

    constructor(public dialog: MatDialog,private http: HttpClient) { }

    /*Creates a modal message and determines its parameters */
    openModalDelete(content) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 100;
        dialogConfig.data=content;
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
    postUser(email): Observable<any>{
      const headers = {'content-type':'application/json'};
      const jsonData=JSON.stringify(email);
      return this.http.post('http://localhost:5000/api/display-myprofile',jsonData,{'headers':headers});
    }
    postPassword(password):Observable<any>{
      const headers = {'content-type':'application/json'};
      const jsonData=JSON.stringify(password);
      return this.http.post('http://localhost:5000/api/confirm-password-myprofile',jsonData,{'headers':headers});
    }
    postChanges(content): Observable<any>{
      const headers = {'content-type':'application/json'};
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/update-myprofile',jsonData,{'headers':headers});
    }
}

