import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class BusinessAddEntryDialogService {
  
    constructor(private http: HttpClient) { }

    postDetails(content): Observable<any>{
        const headers = {'content-type':'application/json'};  
        const jsonData=JSON.stringify(content);
        return this.http.post('http://localhost:5000/api/manage-business-add-entry',jsonData,{'headers':headers});
    }
  
}