import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../../common/app-error';
import { NotFoundError } from '../../common/not-found-error';
import { BadRequestError } from '../../common/bad-request-error';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
@Injectable()
export class DataProvider {

    constructor(private url: string, private http: Http) { }

  changeUrl(url) {
    this.url = url;
  }

  showUrl() {
    console.log(this.url);
  }

  getAll() {
    return this.http.get(this.url)
        .map(response => response.json())
        .catch(this.handleError);
  }

  create(resources) {
    
    return this.http.post(this.url,resources)
        .map(response => {
          response.json()})
        .catch(this.handleError);
  };

  update(resources) {
      return this.http.patch(this.url = '/' + resources.id, JSON.stringify({isRead: true}))
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
        .map(response => response.json())
        .catch(this.handleError);
  }

private handleError(error: Response) {
  if(error.status === 400)
  return Observable.throw(new BadRequestError(error.json()));

  if(error.status === 404)
    return Observable.throw(new NotFoundError());

  return Observable.throw(new AppError(error));
}
}
