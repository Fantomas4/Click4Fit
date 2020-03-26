import { Injectable } from '@angular/core';
import { ENTRIES } from '../mock-database';
import {BusinessEntry} from '../business-entry';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getResults(): Observable<BusinessEntry[]> {
    return of(ENTRIES);
  }
}





  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

