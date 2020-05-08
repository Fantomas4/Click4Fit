import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class ResultCard2Service {

    results;
    constructor(private http: HttpClient){}

    /*getResults(jsonData){
        this.results=jsonData;
    }
    passResults(){
        return this.results;
    }*/
    postFilters(content): Observable<any>{
      const headers = {'content-type':'application/json'}; 
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/workout',jsonData,{'headers':headers});  
    }
  }
