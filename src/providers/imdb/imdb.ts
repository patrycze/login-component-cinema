import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataProvider } from '../data/data';

/*
  Generated class for the ImdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImdbProvider extends DataProvider {

  constructor(http: Http) {
  super('http://www.omdbapi.com/?apikey=e699f616&t=Hydrozagadka', http);
  }

  getImage() {
    return new Promise((resolve, reject) => {
      resolve(this.getAll().toPromise().then());
    })
  }
}
