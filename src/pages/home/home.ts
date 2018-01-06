import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  password = '';
  name = '';

  constructor(public navCtrl: NavController, private auth: AuthLoginProvider) {
    let info = this.auth.getUserInfo();
    this.password = info.password;
    this.name = info.name;
    console.log(this.password, this.name);
  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
}
