import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  register(postData: object) {
    return this.http.post<any>(`${environment.apiUrl}/register`, JSON.stringify(postData), {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map(
        (res: any) => {
          console.log('RECEIVED 1: ', res);
          return res;
    }));
  }
}
