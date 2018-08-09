import { Injectable }               from '@angular/core';
import { Headers, Http ,Response }  from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//models
import { Order }           from '../models/order';
import { OrdersEdit }      from '../models/orderedit';
import { OrderHistory }    from '../models/orderHistory';
import { OrderView }       from '../models/orderview';

// for data passing to other component
import { Observable }      from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Order_ITEMS }    from '../../orders/pages/edit/orders.data';
import { ContextService } from './context.service';
import { environment }    from '../../../environments/environment';
import { findIndex }      from 'lodash';


@Injectable()

export class OrdersService {

  orderID     : number ;
  shipping    : any;
  user_email  : string ;
  useremail   : string;

  // passing data to another component
  private orderitems = new BehaviorSubject <any>(null);
          newitems   = this.orderitems.asObservable();

  private headers = new Headers({ 'Content-Type': 'application/json' });


  private ordersUrl;  // URL to web api

  constructor(private http: Http, private context: ContextService) {
              const locationId = this.context.getCurrentLocation().id;
              this.ordersUrl = environment.apiUrl + '/api/location/' + locationId + '/orders';
  }


// For get order history to order history
  getOrderHistory(order_location){
    console.log("service =",order_location);
    return this.http.get('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/orderhistory/' + order_location).map(res =>res.json());
  }
  
// For view order items in one order
  viewOrder(orderID) {
      return this.http.get('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/orderitemhistory/'+ orderID).map(res => res.json());  
  }

  changeOrderItems(orderview) {
    this.orderitems.next(orderview)
  }

  //get product names to orders edit page select option
  getProducts(){
    return this.http.get('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/productsnames').map(res =>res.json());
  }

  // submit shipped date to the database
  submitDate(shipping) {
    return this.http.post('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/submitdate', shipping).map(res =>res.json());
  }

  // get user id from database
  getuserID(user_email) {
    return this.http.get('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/userID/'+ user_email ).map(res =>res.json());
  }

  // get lesson names from the database
  getLessonNames() {
    return this.http.get('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/getLessonNames' ).map(res =>res.json());
  }

  // send pack data to the database
  sendPackOrder(packOrderDetails) {
    return this.http.post('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/sendPackOrder', packOrderDetails).map(res =>res.json());
  }

  //find the lesson name of the selected lesson(npm library only provide id, for more search ngx-select-ex)
  findLessonName(packOrder) {
    return this.http.post('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/findLessonName', packOrder).map(res =>res.json());
  }

  // get pack order history from database according to it's location
  getPackOrderHistory(locationID) {
    return this.http.get('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/getPackOrderHistory/'+locationID ).map(res =>res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



@Injectable()
export class OrdersEditService {

  private oItems = Order_ITEMS;

  constructor(private http: Http) {}


  submitOrder(oDetails){

    var items = this.oItems;
    var full = Object.assign({oDetails} , {items} );

    return this.http.post('http://ec2-13-229-206-58.ap-southeast-1.compute.amazonaws.com:8080/api/orders/submitorders',full).map(res =>res.json());
  }

  getOrdersFromData(): OrdersEdit[] {
    return this.oItems
  }

  addOrder(neworders: OrdersEdit) {
    this.oItems.push(neworders);
  }
  
  updateOrder(order: any) {
    let index = findIndex(this.oItems, (p: OrdersEdit) => {
      return p.orderitem === order.orderitem;
    });

    this.oItems[index] = order;
  }

  deleteOrder(order: OrdersEdit) {
    this.oItems.splice(this.oItems.indexOf(order), 1);
  }
 
}



