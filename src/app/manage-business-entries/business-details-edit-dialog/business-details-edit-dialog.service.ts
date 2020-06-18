import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BusinessEditEntryService {

    constructor(private http: HttpClient) { }

    getOwner(content): Observable<any>{
        const headers = { 'content-type': 'application/json'}  
        const jsonData=JSON.stringify(content);
        return this.http.post(`${environment.apiUrl}/get-owner`,jsonData,{'headers':headers});
    }
    
}