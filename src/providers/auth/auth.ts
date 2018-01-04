import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { LoginProvider } from '../../providers/login/login';

import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.name = email;
  }
}


@Injectable()
export class AuthProvider {
  currentUser: User;

  constructor(private loginProvider: LoginProvider) {

  }
  // WAŻE http://localhost:8080/api/user/get/test?pass=test

  public login(credentials) {
    this.loginProvider.test('test', 'tescik');
    this.loginProvider.showUrl();
    if(credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to backend to make a real check
         let access = (credentials.password === "pass" && credentials.email === "email")
         this.currentUser = new User('Patryk', 'patryk@gmail.com');
         observer.next(access);
         observer.complete();
      });
    }
  }
  public register(credentials) {
    if(credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials in backend
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
