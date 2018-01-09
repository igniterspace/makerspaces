import { Component, OnInit, Input } from '@angular/core';
import { OrdersService }            from '../../../common/services/order.service';
import { OrderView }                from '../../../common/models/orderview';
import { promise }                  from 'selenium-webdriver';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';
import { FormGroup , FormControl, FormBuilder, AbstractControl, ReactiveFormsModule , Validators, FormsModule } from '@angular/forms';

import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Component({
  templateUrl : './order-view.page.html',
  styleUrls   : ['./order-view.page.css']

})


export class OrderItemsViewPage {
  
  private orderview     : OrderView[];
  private newitems      : any ;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
};

public myForm: FormGroup;

  constructor(private os: OrdersService, private formBuilder: FormBuilder) {}


  


  ngOnInit() {
    this.os.newitems.subscribe(orderview => this.orderview = orderview)


  //   this.myForm = this.formBuilder.group({

  //     myDate: [null, Validators.required]
  // });
    
  }

//   setDate(): void {
   
//     let date = new Date();
//     this.myForm.patchValue({myDate: {
//     date: {
//         year: date.getFullYear(),
//         month: date.getMonth() + 1,
//         day: date.getDate()}
//     }});
// }

// clearDate(): void {
    
//     this.myForm.patchValue({myDate: null});
// }

}
