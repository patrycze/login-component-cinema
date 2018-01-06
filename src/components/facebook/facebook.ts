import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'facebook',
  templateUrl: 'facebook.html'
})
export class FacebookComponent {

  protected FBLoginStatus: boolean = false;
  
  constructor(private fireBaseAuth: AngularFireAuth, public navCtrl: NavController) {

  }

  loginAndGetResults() {
    
    this.fireBaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((result) => {
      this.navCtrl.push('HomePage', 
        { result: result, 
          loginStatus: this.FBLoginStatus })
      })
  }

}
