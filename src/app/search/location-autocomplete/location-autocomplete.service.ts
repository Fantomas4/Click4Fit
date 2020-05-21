import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationAutocompleteService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<any>(`${environment.apiUrl}/getCountries`, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

  getCities() {
    return this.http.get<any>(`${environment.apiUrl}/getCities`, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }
}
