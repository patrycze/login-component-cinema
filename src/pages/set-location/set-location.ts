import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  
  location: Location; 
  marker: Location;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewController: ViewController) {
    this.location = this.navParams.get('location');
    if(this.navParams.get('isSet')) {
      this.marker = this.location;
    }
  }

  
  onSetMarker(event: any) {
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    console.log(this.location)
    this.viewController.dismiss({location: this.marker})
  }


  onAbort() {
    console.log("dziala")  
    console.log(this.location)    
    this.viewController.dismiss();
  }
}
