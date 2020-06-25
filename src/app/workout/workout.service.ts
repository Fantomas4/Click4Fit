import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';


/* This service is about getting workout entries from API and displaying them */
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {


  constructor(private http: HttpClient) { }

  getResults(filterData) {
    return this.http.post<any>(`${environment.apiUrl}/display-workout`, filterData, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }
}
