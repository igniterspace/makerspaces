import { Component } from '@angular/core';
import { OrdersService }      from '../../../common/services/order.service';
import { Order }      from '../../../common/models/order';

@Component({
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.css']
})

export class OrdersListPage {

  private ordersService: OrdersService;
  private orders: Order[];

  constructor(private os: OrdersService) {
    this.ordersService = os;
  }

  getOrders(): void {
    //this.ordersService.getOrders().then(orders => this.orders = orders);
  }

  ngOnInit(): void {
    this.getOrders();
  }
}
