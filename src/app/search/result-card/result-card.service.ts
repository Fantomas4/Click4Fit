import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/** This service  is about sending request to API for addition of a favorite place*/
export class ResultCardService {


  constructor(private http: HttpClient) { }

  addFavoritePlace(content): Observable<any> {
    console.log('no');
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post('http://localhost:5000/api/add-favorite-place', jsonData, { 'headers': headers });

  }
}