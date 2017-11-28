import { Component, OnInit } from '@angular/core';
import { OrdersEdit } from 'app/common/models/orderedit';
import { OrdersEditService } from 'app/common/services/order.service';
import { clone} from 'lodash';
import { FormGroup , FormControl, FormBuilder, AbstractControl, ReactiveFormsModule , Validators, FormsModule } from '@angular/forms';
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
editOrderForm: boolean = false;
editedOrder: any = {};

private orderEditService: OrdersEditService;
private orders: OrdersEdit[];
addOrderForm: FormGroup;
orderitem: string;
note: string;
quantity: number;
unitprice: number;
totalprice: number;

post: any;


items = [
  {id: 1, name: 'Cubes'},
  {id: 2, name: 'Wires'},
  {id: 3, name: 'Icecream sticks'},
  {id: 4, name: 'Motors'}
];
selectedValue = null;

constructor(private _orderService: OrdersEditService,
           private fb: FormBuilder) {

            this.orderEditService = _orderService;
            this.addOrderForm = new FormGroup({

              orderitem : new FormControl( null, Validators.compose([Validators.required])),
              // tslint:disable-next-line:max-line-length
              note      : new FormControl( null, Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])),
              quantity  : new FormControl( null, Validators.compose([Validators.required])),
              unitprice : new FormControl ( null, Validators.compose([Validators.required])),
              totalprice: new FormControl ( null, Validators.compose([Validators.required]))

            });

           }

           getOrders(post) {

            console.log(post);
            this.orderitem  = post.orderitem;
            this.note       = post.note;
            this.quantity   = post.quantity;
            this.unitprice  = post.unitprice;
            this.totalprice = post.totalprice;

          }

ngOnInit() {
this.getnewOrders();
}

isValid(field: string) {
  let formField = this.addOrderForm.get(field);
  return formField.valid || formField.pristine;
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

