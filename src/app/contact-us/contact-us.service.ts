import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class ContactUsService {

    constructor(public dialog: MatDialog,private http: HttpClient) { }

    postDetails(content): Observable<any>{
        const headers = { 'content-type': 'application/json'}  
        const jsonData=JSON.stringify(content);
        return this.http.post('http://localhost:5000/api/contactus',jsonData,{'headers':headers});
    }
    
}