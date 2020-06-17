import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ManageBusinessEntriesService {

  constructor(private http: HttpClient) { }

  getResults(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/manage-business-display-entries`);
  }
  deleteEntries(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/manage-business-delete-entries`, jsonData, { 'headers': headers });
  }
  updateEntry(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/manage-business-modify-entry`, jsonData, { 'headers': headers });
  }
  addEntry(content): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const jsonData = JSON.stringify(content);
    return this.http.post(`${environment.apiUrl}/manage-business-add-entry`, jsonData, { 'headers': headers });

  }
}
