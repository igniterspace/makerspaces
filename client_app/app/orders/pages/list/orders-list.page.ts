import { Component, Input, OnInit } from '@angular/core';
//services
import { OrdersService }            from '../../../common/services/order.service';
import { ContextService }    from '../../../common/services/context.service';
import { AuthService }       from '../../../common/services/auth.service';
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

  //public profile       : any;
  private ordersService : OrdersService;
  private orders        : Order[];
  private orderhistory  : OrderHistory[];
  public orderview      : OrderView[];
         order_id       : number;
        currentLocationId : any;
        userID          : any;
        profile         : any;

  constructor(private os: OrdersService,
              private context : ContextService,
              private auth :  AuthService) {
              this.ordersService = os;
  }

  getOrders(): void {}

// Display all orders
  getOrderHistory(email) {
    var order_location = this.currentLocationId;

    
    this.os.getOrderHistory(email).subscribe(res => {
      this.orderhistory = res.item;
      //console.log("Resc",res.item);
      //----

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

       // Get current user e-mail
       if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
        this.getOrderHistory(this.profile.email);

      } else if (this.auth.isAuthenticated()) {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
this.getOrderHistory(this.profile.email);
        });
      }

      //console.log("your profile is ", this.profile.email);
    //this.getOrderHistory();
    this.getOrders();
  }
}
