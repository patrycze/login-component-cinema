import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { Http } from '@angular/http';


@Injectable()
export class LoginProvider extends DataProvider  {

  constructor(http: Http) {
      super('http://localhost:8080/api/user/get/', http);
   }

   change(name, password) {
     const url = 'http://localhost:8080/api/user/get/' + name + '?pass=' + password;
     this.changeUrl(url);
   }
}
