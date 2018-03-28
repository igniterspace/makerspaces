import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { PaymentsService }          from '../../common/services/payment.service';
import { ContextService }           from './../../common/services/context.service';
import { AuthService }              from './../../common/services/auth.service';

import { ListCourses, ListStudent, DeleteId }       from 'app/common/models/courses';



@Component({
  templateUrl: './payments-list.page.html',
  styleUrls: ['./payments-list.page.css']
})

export class Payment_List_Page {
  
  course_id             : number;
  student_id            : number;
  selectpay             : any;
  paymentdet            : any; 
  total_amount          : any;

  private paymentsService: PaymentsService;
  
  constructor(private ps: PaymentsService,
              private formBuilder: FormBuilder,
              private context: ContextService,
              private auth  : AuthService ) {
    this.paymentsService = ps;
  }

//Get payment details to the frontend..  
viewPayments() {
  var c_id = this.paymentdet.course_id;
  var s_id = this.paymentdet.student_id;
  
  var full_detail = Object.assign({c_id} ,{s_id});
  this.ps.getpayments(full_detail).subscribe(res => {
    this.selectpay = res.item;
  });
} 

//Get total amount paid to the frontend..
getTotalPayment() {
  var c_id = this.paymentdet.course_id;
  var s_id = this.paymentdet.student_id;
  
  var all_details = Object.assign({c_id} ,{s_id});
  this.ps.gettotalpayment(all_details).subscribe(res => {
    this.total_amount = res.item;
  });
} 

ngOnInit(): void {
this.ps.selectpayment.subscribe(paymentdet => this.paymentdet = paymentdet);
this.viewPayments();
this.getTotalPayment();

}

}
