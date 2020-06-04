import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/** This service  is about sending request to API for addition of a favorite workout*/
export class ResultCard2Service {


  constructor(private http: HttpClient) { }

  addFavoriteWorkout(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post('http://localhost:5000/api/add-favorite-workout', jsonData, { 'headers': headers });

  }
}
