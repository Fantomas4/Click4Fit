import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageMyBusinessService {

  constructor(private http: HttpClient) { }

  getBusinesses(userId: string) {
    return this.http.post<any>(`${environment.apiUrl}/manage-my-business`, JSON.stringify({_id: userId}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
        console.log('RECEIVED 1: ', res);
        return res;
      }));
  }
}
