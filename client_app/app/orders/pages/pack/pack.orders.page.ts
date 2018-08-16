import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
//services
import { OrdersService }     from 'app/common/services/order.service';
import { AuthService }       from '../../../common/services/auth.service';
import { ContextService }    from '../../../common/services/context.service';
//models
import { PackOrder}          from '../../../common/models/order';


import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';


@Component({

    templateUrl : './pack.orders.page.html',
    styleUrls   : ['./pack.orders.page.css']
  
  })

  export class PackOrders implements OnInit {


    public items    :any[];
    packOrderForm   : FormGroup;
    packOrderTable  : FormGroup;
    user_email      : string;
    private profile : any;
    userID          : any;
    currentLocationId : any;
    private packOrders: PackOrder[] = [];
    pack_order_table: boolean;
    pack_OrderForm  : boolean;
    addbutton       : boolean;

 
    constructor(private os     : OrdersService,
                private context: ContextService,
                private auth   : AuthService) {

      this.packOrderForm = new FormGroup({
  
              lessonId     : new FormControl,
              packQuantity : new FormControl,
              dueDate      : new FormControl  
      });
    }


// Get lesson names from database for dropdown
getLessonNames(){
    this.os.getLessonNames().subscribe( res => {
        this.items = res.item ;
    });
}

//save pack orders into an array
sendPackOrder(packOrder : any) {

  this.os.findLessonName(packOrder).subscribe(res => {
    var lessonName = res.item[0].name;
  
  var pack_order = Object.assign(packOrder, {lessonName})
  this.packOrders.push(pack_order);
  this.packOrderForm.reset() ;

  this.pack_order_table = true;
  this.pack_OrderForm   = false ;
  this.addbutton        = true;


})
}



//save pack order details to the database( pack order table)
savePackOrder(){

  var userID = this.userID.item[0].id;
  var nowLocation = this.currentLocationId;

  var pack_orders = this.packOrders;
  var insert_details = Object.assign( {userID}, {nowLocation});
  var full_pack_details = Object.assign( {pack_orders} ,{insert_details});

  this.os.sendPackOrder(full_pack_details).subscribe( res => {
    console.log("success");
  })
  alert('Pack order sent successfully!')
  //location.reload();
}

// Get usee ID from database equals to user's email
getuserID(user_email) {
  this.os.getuserID(user_email).subscribe(res => {
    this.userID = res;
  });
}

//show pack order form
showPackOrderForm(){
  this.pack_OrderForm   = true ;
  this.addbutton        = false;
}

// Cancel button in form to clear all the fields
cancelNewOrder() {
  this.packOrderForm.reset() ;
  this.pack_OrderForm   = false;
  this.addbutton        = true;
}

// delete item from pack orders array
deleteOrder(packOrder: PackOrder) {
  this.packOrders.splice(this.packOrders.indexOf(packOrder), 1);
}


    ngOnInit(){

      this.pack_OrderForm = true ;
      this.addbutton      = false;

      this.getLessonNames();

      console.log(this.packOrderForm);

    //Get current location ID
    this.currentLocationId = this.context.getCurrentLocationId();

    // Get current user e-mail
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else if (this.auth.isAuthenticated()) {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.user_email = this.profile.email;
        this.getuserID(this.user_email);
      });
    }
    }
  }