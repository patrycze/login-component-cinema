import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Seat } from '../../models/seat';
import { HttpClient } from '@angular/common/http';

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
  seat: any;
  price: any;
  dimensions;
  selectedMovie: any;
  isSelectedArray = [];
  user: any;
  constructor(private http: HttpClient, private geolocation: Geolocation, private modalController: ModalController, 
    private loadingController: LoadingController, private toastController: ToastController, public navParams: NavParams) {
  }

  onSubmit(form: NgForm) {
    this.isSelectedArray.forEach(el => {
      this.http.post('http://localhost:8080/api/ticket/create', {
        user: this.user,
        title: this.selectedMovie.title,
        cinema: this.location,
        price: this.selectedMovie.price,
        col:  el.column,
        row:  el.row
      }).subscribe(result => {
        console.log(result);
      })  
      console.log(el);
    })
    //console.log(this.user, this.selectedMovie.title, this.location, this.selectedMovie.price);
   
  }

  onOpenMap() {
    const modal = this.modalController.create('SetLocationPage', { location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.location = data.location;
          this.locationIsSet = true;
          this.selectedMovie = data.movie;
          console.log(  this.selectedMovie);
        }
      }
    )
  }

  isColorSelected(column, row) {
    return this.isSelectedArray.findIndex(x => x.column == column && 
      x.row == row) != -1;
  }


  selectSeat() {
    console.log(this.seat);
    const modal = this.modalController.create('SeatPage', { row: this.isSelectedArray, isSet: this.seatIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.dimensions = data.dimensions; 
          this.isSelectedArray = data.isSelectedArray;
          console.log(this.dimensions);
          this.seatIsSet = true; 
          this.markSits();
        }
      }
    )
  }


  markSits() {
    if(typeof(this.seat) !== 'undefined') {
      this.seat.forEach(element => {
        let sit = document.getElementById(`sit-${element.column}-${element.row}`)
        console.log(`sit-${element.column}-${element.row}`);
        console.log(sit);
        sit.focus();
      });
    }
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
    this.user = this.navParams.get('user'); 
    console.log(this.user);
  }

}
