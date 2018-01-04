import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { Http } from '@angular/http';

@Injectable()
export class CreateProvider extends DataProvider {
  
    constructor(http: Http) {
      //super('http://www.omdbapi.com/?apikey=e699f616&t=Hydrozagadka', http);
      super('http://localhost:8080/api/user/create', http);
     }
  
}
