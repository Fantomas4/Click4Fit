import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

/* This service is about getting favorites entries  and displaying them */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getFavoritePlaces(user: object) {
    return this.http.post<any>(`${environment.apiUrl}/favorite-places`, user, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

  getFavoriteWorkouts(user: object) {
    return this.http.post<any>(`${environment.apiUrl}/favorite-workout`, user, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }


}
