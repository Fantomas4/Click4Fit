import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManageBusinessEntriesService {

  constructor(private http: HttpClient) { }

  getBusinesses(){
    return this.http.get<any>(`${environment.apiUrl}/manage-business-display-entries`);
  }

  updateEntry(data: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/manage-business-modify-entry`, data,
      {observe: 'response'}).pipe(map((res: any) => {
      console.log('RECEIVED 1: ', res);
      return res;
    }));
  }

  addEntry(data: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/manage-business-add-entry`, data,
      {observe: 'response'}).pipe(map((res: any) => {
      console.log('RECEIVED 1: ', res);
      return res;
    }));
  }

  deleteEntries(data: object) {
    return this.http.post<any>(`${environment.apiUrl}/manage-business-delete-entries`, JSON.stringify({_id: data}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      console.log('RECEIVED 1: ', res);
      return res;
    }));
  }
}
