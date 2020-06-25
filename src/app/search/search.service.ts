import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getResults(filterData) {
    return this.http.post<any>(`${environment.apiUrl}/search`, filterData, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

  updateUser(request: object) {
    return this.http.post(`${environment.apiUrl}/display-myprofile`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }
}
