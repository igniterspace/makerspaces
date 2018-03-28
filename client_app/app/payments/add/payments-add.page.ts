import { Component, OnInit, OnDestroy } from '@angular/core';

import { Http, Response }   from '@angular/http';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { Observable }       from 'rxjs/Observable';
import { ContextService }   from './../../common/services/context.service';
import { AuthService }      from './../../common/services/auth.service';

import { PaymentsService }  from '../../common/services/payment.service';
import { OrdersService }            from 'app/common/services/order.service';
import { OrdersEditService }        from 'app/common/services/order.service';

import { Payment }          from '../../common/models/payments';


import 'rxjs';


@Component({
  templateUrl: './payments-add.page.html',
  styleUrls: ['./payments-add.page.css']
})

export class Payment_add_Page {
 
  PaymentsService        : any;
  userID                 : any;
  paymentdet             : any; 
  pay_data               : any;
  private profile        : any;
  user_email             : string;
  id                     : number;
  userid                 : any;
  payment                : any;

  private addPaymentForm: FormGroup;

  private paymentsService: PaymentsService;

  constructor(private ps: PaymentsService,
    private os: OrdersService,
    private formBuilder: FormBuilder,
    private http: Http,
    private context: ContextService,
    private auth  : AuthService) {
    this.paymentsService = ps;

    this.addPaymentForm = formBuilder.group({
        course_name     : [''],
        students_name   : [''],
        today           : [''],
        amount_paid     : [''],
        student_id      : [''],
        course_id       : ['']
    });
  }

  isValid(field: string) {
    let formField = this.addPaymentForm.get(field);
    return formField.valid || formField.pristine;
  }

// Get user ID from database equals to user's email
getuserID(user_email) {
  this.os.getuserID(user_email).subscribe(res => {
    this.userID = res;
  });
}

//Send payment details to the database..
savePayment(payment) {
  var userid = this.userID.item[0].id;
  var full_detail = Object.assign(payment , {userid});
    this.ps.savePayment(full_detail).subscribe(res => console.log("payment added success.."));
    this.addPaymentForm.reset();
    alert('This Payment has being added to the Database..');
  }

  

ngOnInit(): void {

// Get current user e-mail
if (this.auth.userProfile) {
  this.profile = this.auth.userProfile;
}
else if (this.auth.isAuthenticated()) {
  this.auth.getProfile((err, profile) => {
    this.profile = profile;
    this.user_email = this.profile.email;
    this.getuserID(this.user_email);
  });
}  


  //this.ps.selectpayment.subscribe(paymentdet => this.paymentdet = paymentdet);
  this.ps.selectpayment.subscribe(paymentdet => {
  this.pay_data = paymentdet;

  this.addPaymentForm.patchValue({
    course_id               : paymentdet.course_id,
    student_id              : paymentdet.student_id,
    courses_name            : paymentdet.courses_name,
    students_name           : paymentdet.students_name,
    });
  })
 
  

}

ngOnDestroy(): void {
  location.reload();
  }

}

