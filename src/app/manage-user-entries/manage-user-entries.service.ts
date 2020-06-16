import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ManageUserEntriesService {

  constructor(private http: HttpClient) { }

  /*getResults(): Observable<UserEntry[]> {
    return of(USERENTRIES);
  }*/
  getResults(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/manage-user-display-entries`);
  }
  deleteEntries(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/manage-user-delete-entries`, jsonData, { 'headers': headers });
  }
  updateEntry(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/manage-user-modify-entry`, jsonData, { 'headers': headers });
  }
}

