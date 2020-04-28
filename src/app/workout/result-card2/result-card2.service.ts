import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class ResultCard2Service {

    results;
    constructor(){}

    getResults(jsonData){
        this.results=jsonData;
        console.log(this.results);
    }
    passResults(){
        console.log(this.results);
        return this.results;
    }
  }
