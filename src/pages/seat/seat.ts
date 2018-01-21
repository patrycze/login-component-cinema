import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Seat } from '../../models/seat';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-seat',
  templateUrl: 'seat.html',
})
export class SeatPage {
  selected;
  isSeat = 0;
  seats;
  seatsFromBase = [];
  constructor(private http: HttpClient, public navCtrl: NavController, public navParams: NavParams,  private viewController: ViewController) {
    if(this.navParams.get('row')) {
      this.isSelectedArray = this.navParams.get('row')
    }
  }

  ionViewDidLoad() {
    if(this.navParams.get('selected')) {
      this.selected = this.navParams.get('selected').title
      console.log(this.isSelectedArray);
      this.getSeats();
    }
    console.log('ionViewDidLoad SeatPage');
    console.log(this.isSelectedArray);    

  }


  getSeats() {
    this.http.post('http://localhost:8080/api/ticket/seats/', {
      title: this.selected
    }).subscribe(res => {
      if(this.seatsFromBase.length == 0) {
        (res as Array<Object>).forEach(element => {
            this.seatsFromBase.push({
              column: parseInt(element['col']),
              row: parseInt(element['row'])
            })
        });
      }
    })
    
  }
  isSelectedArray = [];
  rows = Array.apply(null, Array(10)).map((val, idx) => idx+1);
  columns = Array.apply(null, Array(5)).map((val, idx) => idx+1);
  
  

  onPress(column: number, row: number){
    console.log(column, row);
    var index = this.isSelectedArray.findIndex(x => x.column == column && 
                                                                     x.row == row);
    
    console.log(this.isSeat);    
    if(index < 0) {
      console.log('add');
      this.isSeat = this.isSeat + 1;
      if(index === -1) {
        this.isSelectedArray.push({column, row});
      }
    } else {
      console.log('remove');
      this.isSeat = this.isSeat - 1;
      this.isSelectedArray.splice(index, 1);
    }
    //console.log(this.isSelectedArray)
  }

  isColorSelected(column, row) {
    return this.isSelectedArray.findIndex(x => x.column == column && 
      x.row == row) != -1;
  }
  isColorSelected2(column, row) {
    //console.log(this.seatsFromBase)
    return this.seatsFromBase.findIndex(x => x.column == column && 
      x.row == row) != -1;
  }



  onConfirm() { 
    this.viewController.dismiss({isSelectedArray: this.isSelectedArray, 
      dimensions: { row: this.rows, col: this.columns }
      })
  }


  onAbort() {   
    this.viewController.dismiss();
  }
}
