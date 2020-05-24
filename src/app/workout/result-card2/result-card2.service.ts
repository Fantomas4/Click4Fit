import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class ResultCard2Service {

    results;
    filters;
   
    constructor(private http: HttpClient){}

    getFilters(filters){
      this.filters=filters;
    }
    passFilters(){
      return this.filters;
    }
    postFilters(content): Observable<any>{
      const headers = {'content-type':'application/json'}; 
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/display-workout',jsonData,{'headers':headers});  
    }
    addFavoriteWorkout(content):Observable<any>{
      const headers = {'content-type':'application/json'}; 
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/add-favorite-workout',jsonData,{'headers':headers});  

    }
  }
