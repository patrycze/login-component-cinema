import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/localapi/localapi';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { name: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private alertCtrl: AlertController, private provider: ApiProvider) {
  }

  public register() {
    this.provider.create(this.registerCredentials) 
    .subscribe(() => {
        this.auth.register(this.registerCredentials).subscribe(success => {
          if(success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created");
            this.navCtrl.setRoot('LoginPage');
          } else {
            this.showPopup("Error", "Problem with creating account")
          }
        }, error => {
          this.showPopup("Error", error)
        })
    })
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'OK',
        handler: data => {
          if(this.createSuccess) {
            this.navCtrl.popToRoot();
          }
        }
      }]
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
