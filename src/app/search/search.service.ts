import { Injectable } from '@angular/core';
import {BusinessEntry} from '../business-entry';
import {Observable, of, pipe} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }


  getResults(filterData) {
    console.log(filterData);
    return this.http.post<any>(`${environment.apiUrl}/search`, filterData, {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

}

