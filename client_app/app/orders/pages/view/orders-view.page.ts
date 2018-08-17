import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { OrdersService }            from '../../../common/services/order.service';
import { OrderView }                from '../../../common/models/orderview';
import { promise }                  from 'selenium-webdriver';
import { FormGroup , FormControl, FormBuilder, AbstractControl, ReactiveFormsModule , Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }       from 'ng2-date-picker';



import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Component({
  templateUrl : './order-view.page.html',
  styleUrls   : ['./order-view.page.css']

})


export class OrderItemsViewPage {
  
  private orderview     : OrderView[];
  private newitems      : any ;
  date                  : Date = new Date();
  private addDate       : FormGroup;

public myForm: FormGroup;
  constructor(private os: OrdersService, private formBuilder: FormBuilder) {

    this.addDate = formBuilder.group({
     
      selectedDate :new FormControl()

    });
  }

   setShippingDate(shippingDate : any) {
     
    var obj1 = this.orderview[0].order_id ;
    var obj2 = shippingDate.selectedDate._d ;
    var shipping = Object.assign( {obj1}, {obj2} );
   
    console.log(shipping);

  this.os.submitDate(shipping).subscribe(
    res => console.log("Success"));
        this.addDate.reset ();
          // shippingDate = '' ;
    }


  ngOnInit() {
    
    this.os.newitems.subscribe(orderview => this.orderview = orderview)
    console.log(this.orderview);
    
  }


}
