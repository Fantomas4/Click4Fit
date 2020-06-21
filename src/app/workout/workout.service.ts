import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


/* This service is about getting workout entries from API and displaying them */
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {


  constructor(private http: HttpClient) { }

  getResults(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/display-workout`, jsonData, { 'headers': headers });
  }
  getAllWorkout(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.get(`${environment.apiUrl}/workouts`);
  }
}
