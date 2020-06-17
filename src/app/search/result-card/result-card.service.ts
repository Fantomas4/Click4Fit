import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/** This service  is about sending request to API for addition of a favorite place*/
export class ResultCardService {


  constructor(private http: HttpClient) { }

  addFavoritePlace(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/add-favorite-place`, jsonData, { 'headers': headers });

  }
}