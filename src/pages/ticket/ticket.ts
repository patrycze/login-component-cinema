import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
  tickets: any;
  constructor(private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.http.post('http://localhost:8080/api/ticket/get', { user: this.navParams.get('name')}).subscribe(res => {
    this.tickets = res;
    console.log(this.tickets);
    })
    console.log('ionViewDidLoad TicketPage');
    
  }

}
