import { Component }          from '@angular/core';
import { OrdersService }      from '../../../common/services/order.service';
import { AddOrder }           from '../../../common/models/addorder';

@Component({
   templateUrl: './add-orders.page.html',

})

export class OrdersAddPage {


  constructor(private os: OrdersService) {}


}
