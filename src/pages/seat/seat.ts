import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Seat } from '../../models/seat';

@IonicPage()
@Component({
  selector: 'page-seat',
  templateUrl: 'seat.html',
})
export class SeatPage {

  isSeat = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private viewController: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeatPage');
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


  onConfirm() { 
    this.viewController.dismiss({isSelectedArray: this.isSelectedArray, 
      dimensions: { row: this.rows, col: this.columns }
      })
  }


  onAbort() {   
    this.viewController.dismiss();
  }
}
