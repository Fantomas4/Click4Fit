import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DialogMessageComponent} from '../dialog-message/dialog-message.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

/*This service is about showing an alert modal message to confirm the user's willing for deleting
his account*/
@Injectable()
export class MyProfileService {

    constructor(public dialog: MatDialog,private http: HttpClient) { }

    /*Creates a modal message and determines its parameters */
    openModal() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = 100;
      const dialogRef = this.dialog.open(DialogMessageComponent, dialogConfig);
      dialogRef.afterClosed().subscribe();
    }
    getDetails(): Observable<any>{
      return this.http.get('http://localhost:5000/api/display-myprofile');
    }
    postDetails(content): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/update-myprofile',jsonData,{'headers':headers});
    }
}

