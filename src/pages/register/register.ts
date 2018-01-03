import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private alertCtrl: AlertController) {
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if(success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created");
      } else {
        this.showPopup("Error", "Problem with creating account")
      }
    }, error => {
      this.showPopup("Error", error)
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
