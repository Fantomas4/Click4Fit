import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/*This service is about the requests to API */
@Injectable()
export class MyProfileService {

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  displayUser(email): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(email);
    return this.http.post(`${environment.apiUrl}/api/display-myprofile`, jsonData, { 'headers': headers });
  }
  updateChanges(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/api/update-myprofile`, jsonData, { 'headers': headers });
  }
  deleteProfile(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/api/delete-myprofile`, jsonData, { 'headers': headers });
  }

}

