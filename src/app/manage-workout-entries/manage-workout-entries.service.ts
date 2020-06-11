import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageWorkoutEntriesService {
  constructor(private http: HttpClient) { }

  getWorkouts() {
    return this.http.post<any>(`${environment.apiUrl}/get-my-business`, JSON.stringify({_id: userId}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      console.log('RECEIVED 1: ', res);
      return res;
    }));
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
