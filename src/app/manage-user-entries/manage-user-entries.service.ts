import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {USERENTRIES} from '../mock-database';
import {UserEntry} from '../user-entry';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ManageUserEntriesService {

  constructor(private http: HttpClient) { }

  /*getResults(): Observable<UserEntry[]> {
    return of(USERENTRIES);
  }*/
  getResults(): Observable<any>{
    return this.http.get('http://localhost:5000/api/manage-user-display-entries');
  }
  deleteEntries(id):Observable<any>{
    const headers = {'content-type':'application/json'};  
    const jsonData=JSON.stringify(id);
    return this.http.post('http://localhost:5000/api/manage-user-delete-entries',jsonData,{'headers':headers});
  }
}

