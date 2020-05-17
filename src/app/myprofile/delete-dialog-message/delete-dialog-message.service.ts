import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class DeleteDialogMessageService {


    constructor(private http: HttpClient) { }

    postProfile(content):Observable<any>{
        const headers = {'content-type':'application/json'};
        const jsonData=JSON.stringify(content);
        return this.http.post('http://localhost:5000/api/delete-myprofile',jsonData,{'headers':headers});
    }
}
