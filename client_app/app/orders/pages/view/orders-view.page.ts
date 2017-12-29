import { Component, OnInit, Input } from '@angular/core';
import { OrdersService }            from '../../../common/services/order.service';
import { OrderView }                from '../../../common/models/orderview';
import { promise }                  from 'selenium-webdriver';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Component({
  templateUrl : './order-view.page.html',
  styleUrls   : ['./order-view.page.css']

})
export class OrderItemsViewPage {
  
  private orderview     : OrderView[];
  private newitems      : any ;

  constructor(private os: OrdersService) {}

  ngOnInit() {
    this.os.newitems.subscribe(orderview => this.orderview = orderview)
    //var orderID : number;
      // this.os.viewOrder(orderID).subscribe(res => {
      //   this.orderview = res.item;
      //   console.log(res.item);
      // });

     // this.os.newitems.subscribe(orderview => this.orderview = orderview)
  }
}
