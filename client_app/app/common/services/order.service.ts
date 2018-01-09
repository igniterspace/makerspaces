import { Injectable }               from '@angular/core';
import { Headers, Http ,Response }  from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Order }           from '../models/order';
import { OrdersEdit }      from '../models/orderedit';
import { OrderHistory }    from '../models/orderHistory';
import { OrderView }       from '../models/orderview';
import { Observable }      from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ContextService } from './context.service';
import { environment }    from '../../../environments/environment';
import { Order_ITEMS }    from '../../orders/pages/edit/orders.data';
import { findIndex }      from 'lodash';


@Injectable()

export class OrdersService {

  orderID : number ;

  private orderitems = new BehaviorSubject <any>(null);
          newitems   = this.orderitems.asObservable();

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private ordersUrl;  // URL to web api

  constructor(private http: Http, private context: ContextService) {
    const locationId = this.context.getCurrentLocation().id;
    this.ordersUrl = environment.apiUrl + '/api/location/' + locationId + '/orders';
  }

// For get order history to order history

  getOrderHistory(){
    return this.http.get('http://localhost:8080/api/orders/orderhistory').map(res =>res.json());
  }
  
// For view order items in one order

  viewOrder(orderID) {
      return this.http.get('http://localhost:8080/api/orders/orderitemhistory/'+ orderID).map(res => res.json());  
  }

  changeOrderItems(orderview) {
    this.orderitems.next(orderview)
  }

  //get product names to orders edit page select option
  getProducts(){
    return this.http.get('http://localhost:8080/api/orders/productsnames').map(res =>res.json());
  }

   

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}





@Injectable()
export class OrdersEditService {

  private oItems = Order_ITEMS;

  constructor(private http: Http) {
  }


  submitOrder(oItems){
    return this.http.post('http://localhost:8080/api/orders/submitorders',this.oItems).map(res =>res.json());

  }

  getOrdersFromData(): OrdersEdit[] {
    console.log(this.oItems);
    return this.oItems
  }

  addOrder(neworders: OrdersEdit) {
    console.log('new order', neworders);
    this.oItems.push(neworders);
    console.log(this.oItems);
  }
  
  updateOrder(order: any) {
    console.log(order);
    let index = findIndex(this.oItems, (p: OrdersEdit) => {
      return p.orderitem === order.orderitem;
    });

    this.oItems[index] = order;
  }

  deleteOrder(order: OrdersEdit) {
    this.oItems.splice(this.oItems.indexOf(order), 1);
    console.log(this.oItems);
  }

  // deleteRows(oItems : OrdersEdit[]){
  //   this.oItems = [] ;
  // }
}



