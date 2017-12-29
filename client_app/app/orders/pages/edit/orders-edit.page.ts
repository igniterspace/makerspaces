import { Component, Input, OnInit } from '@angular/core';
import { OrdersEdit }        from 'app/common/models/orderedit';
import { OrdersService }     from 'app/common/services/order.service';
import { OrdersEditService } from 'app/common/services/order.service';
import { clone}              from 'lodash';
import { FormGroup , FormControl, FormBuilder, AbstractControl, ReactiveFormsModule , Validators, FormsModule } from '@angular/forms';


@Component({

  moduleId: module.id,
  templateUrl: './orders-edit.page.html',
  styleUrls  : ['./orders-edit.page.css']

})

export class OrdersEditPage implements OnInit {

neworders    : OrdersEdit[];
orderForm    : boolean = false;
isNewForm    : boolean;
newOrder     : any = {};
editOrderForm: boolean = false;
editedOrder  : any = {};
@Input()neworder : any ;

productNames : any ;

private orderEditService: OrdersEditService;
private orders: OrdersEdit[];
addOrderForm  : FormGroup;
orderitem     : string;
note          : string;
quantity      : number;
unitprice     : number;
totalprice    : number;

post: any;


selectedValue = null;

constructor(private _orderService: OrdersEditService,
            private os           : OrdersService,
            private fb           : FormBuilder) {

            this.orderEditService = _orderService;
            this.addOrderForm     = new FormGroup({

              orderitem : new FormControl( null, Validators.compose([Validators.required])),
              note      : new FormControl( null, Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])),
              quantity  : new FormControl( null, Validators.compose([Validators.required])),
              unitprice : new FormControl( null, Validators.compose([Validators.required]))

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
          submitOrder(oItems) {
            this._orderService.submitOrder(oItems).subscribe(res => console.log("Success"));
          }

          ngOnInit() {
            this.getnewOrders();
            this.getProducts();
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

