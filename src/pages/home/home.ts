import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';

  constructor(public navCtrl: NavController, private auth: AuthProvider) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
}
