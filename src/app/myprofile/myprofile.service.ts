import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/*This service is about the requests to API */
@Injectable()
export class MyProfileService {

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  getUser(content: object) {
    return this.http.post<any>(`${environment.apiUrl}/display-myprofile`, JSON.stringify(content),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  updateUser(content: object) {
    return this.http.post<any>(`${environment.apiUrl}/update-myprofile`, JSON.stringify(content),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  deleteProfile(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/delete-myprofile`, jsonData, { headers: headers });
  }

}

