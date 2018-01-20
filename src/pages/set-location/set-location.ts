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
  cinema: any;
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

  updateDiv(cinema) {
    this.http.post('http://localhost:8080/api/film/get', { cinema : cinema.name }).subscribe(result => {
      this.movies = result;
      console.log(cinema)
      this.cinema = cinema;
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
    this.viewController.dismiss({location: this.cinema.name, movie: this.movies[this.selectedRow]})
  }


  onAbort() {
    console.log("dziala")  
    console.log(this.location)    
    this.viewController.dismiss();
  }
}
