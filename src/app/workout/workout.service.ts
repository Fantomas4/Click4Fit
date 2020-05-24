import { Injectable } from '@angular/core';
  import {Observable, of} from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';


/* This service is about getting workout entries from mock-database and displaying them */
@Injectable({
    providedIn: 'root'
  })
  export class WorkoutService {
  
    
    constructor(private http: HttpClient) { }
    
    getResults(content): Observable<any>{
      const headers = {'content-type':'application/json'}; 
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/display-workout',jsonData,{'headers':headers});  
    }
  }