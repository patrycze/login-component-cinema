import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { LoginProvider } from '../../providers/login/login';
export class User {
  name: string;
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}


@Injectable()
export class AuthLoginProvider {
  access: any;
  currentUser: User;

  constructor(private loginProvider: LoginProvider) {

  }
  // WAŻE http://localhost:8080/api/user/get/test?pass=test

   public login(credentials) { 
    this.currentUser = new User(credentials.email, credentials.password);
    console.log(credentials);
    return new Promise((resolve, reject) => {
      let access;
      // change url for auth login
      this.loginProvider.change(credentials.email, credentials.password);
  
      resolve(this.loginProvider.getAll().toPromise().then())
    })
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



 export class AuthRegisterProvider {
  currentUser: User;

  
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
