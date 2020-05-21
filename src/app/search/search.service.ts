import { Injectable } from '@angular/core';
import {BusinessEntry} from '../business-entry';
import {Observable, of, pipe} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }


  getResults(filterData) {
    console.log(filterData);
  }

}





  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

