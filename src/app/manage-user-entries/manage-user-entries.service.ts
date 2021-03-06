import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUserEntriesService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${environment.apiUrl}/manage-user-display-entries`);
  }

  updateUserEntry(data: object) {
  return this.http.post<any>(`${environment.apiUrl}/manage-user-modify-entry`, data,
    {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
    return res;
  }));
  }

  deleteEntries(data: object) {
    return this.http.post<any>(`${environment.apiUrl}/manage-user-delete-entries`, JSON.stringify({_id: data}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }
}

