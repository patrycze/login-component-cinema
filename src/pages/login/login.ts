import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthLoginProvider } from '../../providers/auth/auth';
import { LoginProvider } from '../../providers/login/login';
import { ImdbProvider } from '../../providers/imdb/imdb';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})



export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: ''};
  film = { title: '', poster: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private authLogin: AuthLoginProvider, 
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private imdbProvider: ImdbProvider) {
  
  }
  public getInfoAboutFilm() {
    this.imdbProvider.getAll().toPromise().then(response => {
      this.film.title = response.Title;
      this.film.poster = response.Poster;
      console.log(response);
    })
  }

  public goToProfile() {
    this.navCtrl.push('HomePage');
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
    this.getInfoAboutFilm();
    console.log('ionViewDidLoad LoginPage');
  }

}

export class Film {
  title: string;
  poster: string;

  constructor(title: string, poster: string) {
    this.title = title;
    this.poster = poster;
  }
}