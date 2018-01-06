import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth/auth';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private authLogin: AuthLoginProvider, 
    private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

   public login() { 
      this.showLoading();
      this.authLogin.login(this.registerCredentials).then(response => {
        if((response as Array<{}>).length != 0) {
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
