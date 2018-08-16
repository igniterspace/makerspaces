import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
//services
import { OrdersService }     from 'app/common/services/order.service';
import { AuthService }       from '../../../common/services/auth.service';
import { ContextService }    from '../../../common/services/context.service';
//models
import { PackOrder}          from '../../../common/models/order';

@Component({

    templateUrl : './pack.history.page.html',
    styleUrls   : ['./pack.history.page.css']
  
  })

  export class PackOrderHistory implements OnInit {

    user_email      : string;
    private profile : any;
    userID          : any;
    currentLocationId : any;
    packOrder_history: any[];
 
    constructor(private os     : OrdersService,
                private context: ContextService,
                private auth   : AuthService) {}

    //get pack order history from the database according to the location
    getPackOrderHistory(){
        this.os.getPackOrderHistory(this.currentLocationId).subscribe( res =>{
            this.packOrder_history = res.item;
        })
    }

    ngOnInit(){
    //Get current location ID
    this.currentLocationId = this.context.getCurrentLocationId();

    this.getPackOrderHistory();
    }
  }
