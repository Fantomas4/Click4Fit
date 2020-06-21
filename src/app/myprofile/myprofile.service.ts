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

  modifyUser(content: object) {
    return this.http.post<any>(`${environment.apiUrl}/update-myprofile`, JSON.stringify(content),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  updatePassword(content: object) {
    return this.http.post<any>(`${environment.apiUrl}/change-password`, JSON.stringify(content),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  deleteUser(content): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/delete-myprofile`, JSON.stringify(content),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

}

