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

  getResults(): Observable<BusinessEntry[]> {
    return of(ENTRIES);
    //return this.http.get('http://localhost:5000/api/manage-business-display-entries');
  }

}
