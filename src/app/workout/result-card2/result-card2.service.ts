import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/** This service  is about sending request to API for addition of a favorite workout*/
export class ResultCard2Service {


  constructor(private http: HttpClient) { }

  addFavoriteWorkout(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/add-favorite-workout`, jsonData, { 'headers': headers });

  }
}
