import { Component, OnInit } from '@angular/core';
import { OrdersEdit } from 'app/common/models/orderedit';
import { OrdersEditService } from 'app/common/services/order.service';
import { clone} from 'lodash';

@Component({

  moduleId: module.id,
  templateUrl: './orders-edit.page.html',
  styleUrls: ['./orders-edit.page.css']

})

export class OrdersEditPage implements OnInit {
neworders: OrdersEdit[];
// tslint:disable-next-line:no-inferrable-types
orderForm: boolean = false;
isNewForm: boolean;
newOrder: any = {};
// tslint:disable-next-line:no-inferrable-types
editOrderForm: boolean = false;
editedOrder: any = {};

constructor(private _orderService: OrdersEditService) {}

ngOnInit() {
this.getnewOrders();
}

getnewOrders() {
this.neworders = this._orderService.getOrdersFromData();
}

 showEditOrderForm (order: OrdersEdit) {
      if ( !order ) {
        this.orderForm = false;
        return;
  }
   this.editOrderForm = true;
   this.editedOrder = clone(order);
}

showAddOrderForm() {

 if (this.neworders.length) {
   this.newOrder = {};
 }
 this.orderForm = true;
 this.isNewForm = true;

}

saveOrder(order: OrdersEdit) {

  if (this.isNewForm) {
    // add new product
    this._orderService.addOrder(order);
  }
  this.orderForm = false;
}

updateOrder() {
  this._orderService.updateOrder(this.editedOrder);
  this.editOrderForm = false;
  this.editedOrder = {};
}

cancelEdits() {
  this.editedOrder = {};
  this.editOrderForm = false;
}

removeOrder(order: OrdersEdit) {
  this._orderService.deleteOrder(order);
}

cancelNewOrder() {
  this.newOrder = {};
  this.orderForm = false;
}

}

