import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth/auth';
// import { CinemasPage } from '../cinemas/cinemas';
// import { RecomendedPage } from '../recomended/recomended';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  password = '';
  name = '';
  private data;
  private loginStatus;

  constructor(public navCtrl: NavController, private auth: AuthLoginProvider, public navParams: NavParams) {
    // let info = this.auth.getUserInfo();
    // this.password = info.password;
    // this.name = info.name;
    // console.log(this.password, this.name);
  }

  ngOnInit() {
    this.data = this.navParams.get('result');
    this.loginStatus = this.navParams.get('loginStatus');
  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
  
  goToRecomendedPage() {
    this.navCtrl.push('RecomendedPage');
  }

    logInConsole() {
      console.log(this.data);
      console.log(this.loginStatus);
    }
    // goToCinemasPage() {
    //   this.navCtrl.push('RecomendedPage')
    // }
    
    //  tab1root = HomePage;
    //  tab2root = CinemasPage;
    //  tab3root = RecomendedPage;
}
