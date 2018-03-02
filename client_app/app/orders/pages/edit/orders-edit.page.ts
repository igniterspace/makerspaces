import { Component, Input, OnInit } from '@angular/core';
import { OrdersEdit }               from 'app/common/models/orderedit';
import { Details }                  from 'app/common/models/orderedit';
import { OrdersService }            from 'app/common/services/order.service';
import { OrdersEditService }        from 'app/common/services/order.service';
import { clone }                    from 'lodash';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Location }                 from '@angular/common';
import { ContextService }           from '../../../common/services/context.service';
import { AuthService }              from '../../../common/services/auth.service';


@Component({

  moduleId: module.id,
  templateUrl : './orders-edit.page.html',
  styleUrls   : ['./orders-edit.page.css']

})

export class OrdersEditPage implements OnInit {

  neworders     : OrdersEdit[];
  orderForm     : boolean = false;
  isNewForm     : boolean;
  newOrder      : any = {};
  editOrderForm : boolean = false;
  editedOrder   : any = {};
  
  @Input() neworder: any;

  productNames: any;

  private orderEditService: OrdersEditService;
  private orders : OrdersEdit[];
  addOrderForm   : FormGroup;
  orderitem;
  note           : string;
  quantity       : number;
  unitprice      : number;
  totalprice     : number;
  private profile: any;
  userID         : any;
  user_email     : string;
  post           : any;
  oItems         : any;
  currentLocationId: number;
  oDetails       : Details[] = [];

  selectedValue = null;
  private location = {};
  private locationId: number;

  constructor(private _orderService: OrdersEditService,
    private os    : OrdersService,
    private fb    : FormBuilder,
    private context: ContextService,
    private auth  : AuthService) {

    this.orderEditService = _orderService;
    this.addOrderForm = new FormGroup({

      orderitem : new FormControl(null, Validators.compose([Validators.required])),
      note      : new FormControl(null, Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])),
      quantity  : new FormControl(null, Validators.compose([Validators.required])),
      unitprice : new FormControl(null, Validators.compose([Validators.required]))

    });
  }

  // Get products names to the edit Form
  getProducts() {
    this.os.getProducts().subscribe(res => {
      this.productNames = res.item;
      console.log(res.item);
    });
  }

  //Submit full order to database
  submitOrder(oDetails) {

    this.oDetails.push(
      new Details(this.currentLocationId, this.userID.item[0].id));
    console.log(this.oDetails);

    this._orderService.submitOrder(this.oDetails).subscribe(res => {
      console.log("Success")
    });

    location.reload();
  }


  // Get usee ID from database equals to user's email
  getuserID(user_email) {
    this.os.getuserID(user_email).subscribe(res => {
      this.userID = res;
      console.log("user id =", this.userID.item[0].id);
    });
  }


  ngOnInit() {
    this.getnewOrders();
    this.getProducts();

    //Get current location ID
    this.currentLocationId = this.context.getCurrentLocationId();
    console.log(this.currentLocationId);

    // Get current user e-mail
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    }
    
    else if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.user_email = this.profile.email;
        console.log(this.user_email);
        this.getuserID(this.user_email);
      });
    }

  }


  getnewOrders() {
    this.neworders = this._orderService.getOrdersFromData();
  }

  showEditOrderForm(order: OrdersEdit) {
    if (!order) {
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
    console.log(order);

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

