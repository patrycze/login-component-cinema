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
  userPosts: any;
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
test() {
  this.getAllPosts().subscribe(response => {
    console.log(response);
  })
}
  getAllPosts() {

  

    // this.http.post('http://localhost:8080/api/userfilm/get/', {
    //   name: this.name
    // }).mergeMap((interests) => {
    //   return this.http.post('http://localhost:8080/api/post/get/', {
    //     filmid: interests
    //   }).map((res: Response) => {res.json()});
    // })
      return this.http.post('http://localhost:8080/api/userfilm/get/', {
      name: this.name
    })
     .map((res: any) => {
       res = res.filmid;
      })
    .flatMap((film: any) => {
      console.log(film);      
      return this.http.post('http://localhost:8080/api/post/get/', {
        filmid: film.filmid
      })
       .map((res: any) => {
        //  res.json()
         });
    })

  //   this.http.post('http://localhost:8080/api/userfilm/get/',{
  //     name: this.name
  //   }).subscribe(res => {
  //     console.log(res);
  //   })

  //   this.http.post('http://localhost:8080/api/userfilm/get/',{
  //     name: this.name
  //   }).map((res: Response) => {
  //     this.customer = res;
  //     return this.customer;
  //  })
  //   .mergeMap((film:any) => this.http.post('http://localhost:8080/api/post/get/', {
  //     filmid : "tt0071853"
  //   }))
  //   .subscribe(res => console.log(res));

//   return this.http.post('http://localhost:8080/api/userfilm/get/',{
//         name: this.name
//       }).flatMap((film: any) => this.http.post('http://localhost:8080/api/post/get/', {
//         filmid: film.filmid
//       }))
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
    }
}
