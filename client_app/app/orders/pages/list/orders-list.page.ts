import { Component, Input, OnInit } from '@angular/core';
//services
import { OrdersService }            from '../../../common/services/order.service';
import { ContextService }    from '../../../common/services/context.service';
//models
import { Order }                    from '../../../common/models/order';
import { OrderView }                from '../../../common/models/orderview';
import { promise }                  from 'selenium-webdriver';
import { OrderHistory }             from '../../../common/models/orderHistory';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Component({
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.css']
})

export class OrdersListPage implements OnInit {

  private ordersService : OrdersService;
  private orders        : Order[];
  private orderhistory  : OrderHistory[];
  public orderview      : OrderView[];
         order_id       : number;
        currentLocationId : any;

  constructor(private os: OrdersService,
              private context : ContextService) {
              this.ordersService = os;
  }

  getOrders(): void {}

// Display all orders
  getOrderHistory() {
    var order_location = this.currentLocationId;
    this.os.getOrderHistory(order_location).subscribe(res => {
      this.orderhistory = res.item;
      console.log(res.item);
    });
  }
 
  // view items of a order
  viewOrder(orderID: number) {
    console.log(orderID)
      this.os.viewOrder(orderID).subscribe(res => {
      this.orderview = res.item;
      this.os.changeOrderItems(this.orderview)
      this.os.newitems.subscribe( orderview=> this.orderview = orderview)
    });
  }


  ngOnInit(){
    //Get current location ID
    this.currentLocationId = this.context.getCurrentLocationId();
    console.log(this.currentLocationId);

    this.getOrderHistory();
    this.getOrders();
  }
}
