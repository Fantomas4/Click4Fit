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
    return this.http.get<any>(`${environment.apiUrl}/workouts`,
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

  updateEntry(data: object) {
    return this.http.put<any>(`${environment.apiUrl}/workouts`, data,
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

  addEntry(data: object) {
    return this.http.post<any>(`${environment.apiUrl}/workouts`, data,
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteEntries(data: object) {
    return this.http.post<any>(`${environment.apiUrl}/delete-workouts`, JSON.stringify({_id: data}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
      return res;
    }));
  }
}
