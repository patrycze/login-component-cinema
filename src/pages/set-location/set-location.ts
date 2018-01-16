import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  
  location: Location; 
  marker: Location;
  cinemas: any;
  movies: any;
  selectedRow: any;
  constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams, private viewController: ViewController) {
    this.location = this.navParams.get('location');
    this.getCinema()
    if(this.navParams.get('isSet')) {
      this.marker = this.location;
      
    }
  }
  setClickedRow = function(index){
    this.selectedRow = index;
    console.log(this.movies[this.selectedRow])
  }

  updateDiv(test) {
    this.http.post('https://pastebin.com/raw/9yXnuQwZ', {}).subscribe(result => {
      this.movies = result;
      console.log(this.movies)
    })
  }
  getCinema() {
    this.http.post('http://localhost:8080/api/cinema/getall/', {}).subscribe(result => {
      this.cinemas = result;
    })
  }
  
  onSetMarker(event: any) {
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    console.log(this.location)
    this.viewController.dismiss({location: this.marker, movie: this.movies[this.selectedRow]})
  }


  onAbort() {
    console.log("dziala")  
    console.log(this.location)    
    this.viewController.dismiss();
  }
}
