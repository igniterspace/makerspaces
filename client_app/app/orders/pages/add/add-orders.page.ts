import { Component } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { OrdersService }      from '../../../common/services/order.service';
// tslint:disable-next-line:import-spacing
import { AddOrder }      from '../../../common/models/addorder';

@Component({
   templateUrl: './add-orders.page.html',
   // styleUrls: ['./add-orders.page.css']
   // template: '<h2>order create</h2>'
})

export class OrdersAddPage {


  constructor(private os: OrdersService) {}


}
