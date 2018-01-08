import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs/'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  password = '';
  name = '';
  avatar = '';
  private data;
  private loginStatus;
  userPosts = new Array();
  isReady = false;
  constructor(public navCtrl: NavController, private auth: AuthLoginProvider, public navParams: NavParams,  private http: HttpClient) {

    //console.log(this.password, this.name);
  }

  ngOnInit() {
    
    this.data = this.navParams.get('result');
    this.loginStatus = this.navParams.get('loginStatus');
    if(this.data) {
      this.name = this.data.user.displayName;
      this.avatar = this.data.user.photoURL;
    } else {
      let info = this.auth.getUserInfo();
      this.password = info.password;
      this.name = info.name;
    }
  }
  getAllPosts() {

  this.http.post('http://localhost:8080/api/userfilm/get/', {
    name: this.name })
  .map(res => res)
  .mergeMap((films: any[]) => {
    if (films.length > 0) {
      return Observable.forkJoin(
        films.map((film: any) => {
          return this.http.post('http://localhost:8080/api/post/get/', {
            filmid: film.filmid })
            .map((res: any) => {
              return res;
            });
        })
      );
    } else {
      return Observable.of([]);
    }
  }).subscribe(res => {
    res.forEach(e => {
      this.userPosts.push(e[0]);
      //console.log(e[0]);
    })
    this.isReady = true;
    console.log(this.isReady);
    console.log(this.userPosts);
    this.refreshPage();
    
  });
}  

goToAddPlace() {
  console.log("Add")
  this.navCtrl.push('AddPlacePage');
}

 refreshPage() {
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
}

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
  
  goToRecomendedPage() {
    this.navCtrl.push('RecomendedPage', {
      name: this.name,
      pass: 'test'
    });
  }

    logInConsole() {
      console.log(this.data);
      console.log(this.loginStatus);
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
      this.getAllPosts() 
    }
}
