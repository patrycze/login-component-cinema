import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Seat } from '../../models/seat';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.76,
    lng: 40.76
  }
  locationIsSet = false;
  seatIsSet = false;
  seat: Seat;
  dimensions;
  constructor(private geolocation: Geolocation, private modalController: ModalController, 
    private loadingController: LoadingController, private toastController: ToastController,private n: NavController) {
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
  }

  onOpenMap() {
    const modal = this.modalController.create('SetLocationPage', { location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  selectSeat() {
    console.log(this.seat);
    const modal = this.modalController.create('SeatPage', { row: this.seat, isSet: this.seatIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.seat = data.isSelectedArray;
          this.seatIsSet = true; 
          this.dimensions = data.dimensions; 
        }
      }
    )
  }

  onLocate() {
    const loader = this.loadingController.create({
      content: 'Getting your location..'
    })
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      this.locationIsSet = true;
     }).catch((error) => {
      loader.dismiss();
      const toast = this.toastController.create({
        message: 'Could not get position',
        duration: 2500
      });
      toast.present();
     });
  }

  checkAllConditions() {
    if(this.seatIsSet && this.locationIsSet)
      return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
     
  }

}
