import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DeleteDialogMessageComponent} from './delete-dialog-message/delete-dialog-message.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';

/*This service is about showing an alert modal message to confirm the user's willing for deleting
his account*/
@Injectable()
export class MyProfileService {

    result;
    constructor(public dialog: MatDialog,private http: HttpClient) { }
   
    displayUser(email): Observable<any>{
      const headers = {'content-type':'application/json'};
      const jsonData=JSON.stringify(email);
      return this.http.post('http://localhost:5000/api/display-myprofile',jsonData,{'headers':headers});
    }
    updateChanges(content): Observable<any>{
      const headers = {'content-type':'application/json'};
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/update-myprofile',jsonData,{'headers':headers});
    }
    deleteProfile(content):Observable<any>{
      const headers = {'content-type':'application/json'};
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/delete-myprofile',jsonData,{'headers':headers});
    }
  
}

