import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {BusinessEntry} from '../business-entry';
import {ENTRIES} from '../mock-database';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ManageBusinessEntriesService {

  constructor(private http: HttpClient) { }

  /*getResults(): Observable<BusinessEntry[]> {
    return of(ENTRIES);
  }*/
  getResults(): Observable<any>{
    return this.http.get('http://localhost:5000/api/manage-business-display-entries');
  }
  deleteEntries(id):Observable<any>{
    const headers = {'content-type':'application/json'};  
    const jsonData=JSON.stringify(id);
    return this.http.post('http://localhost:5000/api/manage-business-delete-entry',jsonData,{'headers':headers});
  }
  updateEntry(content): Observable<any>{
    const headers = {'content-type':'application/json'};  
    const jsonData=JSON.stringify(content);
    return this.http.post('http://localhost:5000/api/manage-business-modify-entry',jsonData,{'headers':headers});
}
}
