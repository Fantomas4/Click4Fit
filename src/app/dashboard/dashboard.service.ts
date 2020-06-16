import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

/* This service is about getting favorites entries  and displaying them */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getFavoriteWorkout(user):Observable<any>{
    const headers = {'content-type':'application/json'};
    const jsonData=JSON.stringify(user);
    return this.http.post(`${environment.apiUrl}/favorite-workout`,jsonData,{'headers':headers});
  }
  getFavoritePlaces(user):Observable<any>{
    const headers = {'content-type':'application/json'};
    const jsonData=JSON.stringify(user);
    return this.http.post(`${environment.apiUrl}/api/favorite-places`,jsonData,{'headers':headers});
  }

}
