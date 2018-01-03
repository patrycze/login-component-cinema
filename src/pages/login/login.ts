import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if(allowed) {
        console.log(allowed);
        this.navCtrl.setRoot('HomePage');
      } else {
        this.showError("Acces Denied");
      }
    }, 
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    //alert.present(prompt);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
