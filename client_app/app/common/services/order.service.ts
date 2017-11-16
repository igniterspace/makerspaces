import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Order } from '../models/order';
import { OrdersEdit } from '../models/orderedit';

import { ContextService } from './context.service';
import { environment } from '../../../environments/environment';
import { Order_ITEMS } from '../../orders/pages/edit/orders.data';
import { findIndex} from 'lodash';

@Injectable()

export class OrdersService {

  private headers = new Headers({'Content-Type': 'application/json'});
private ordersUrl;  // URL to web api

  constructor(private http: Http, private context: ContextService) {
    const locationId = this.context.getCurrentLocation().id;
    this.ordersUrl = environment.apiUrl + '/api/location/' + locationId + '/orders';
  }

  getOrders(): Promise<Order[]> {
   return;
  }

 /*
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
 */

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
  }
}




@Injectable()
export class OrdersEditService {
private oItems = Order_ITEMS;

  getOrdersFromData(): OrdersEdit[] {
    console.log(this.oItems);
    return this.oItems
  }

  addOrder(neworders: OrdersEdit) {
    this.oItems.push(neworders);
    console.log(this.oItems);
  }

  updateOrder(order: OrdersEdit) {
    let index = findIndex(this.oItems, (p: OrdersEdit) => {
      return p.orderitem === order.orderitem;
    } );

    this.oItems[index] = order;
  }

  deleteOrder( order: OrdersEdit) {
    this.oItems.splice(this.oItems.indexOf(order), 1);
    console.log(this.oItems);
  }
}



