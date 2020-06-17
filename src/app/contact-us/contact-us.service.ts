import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContactUsService {

    constructor(public dialog: MatDialog,private http: HttpClient) { }

    postDetails(content): Observable<any>{
        const headers = { 'content-type': 'application/json'}  
        const jsonData=JSON.stringify(content);
        return this.http.post(`${environment.apiUrl}/contactus`,jsonData,{'headers':headers});
    }
    
}