import { Component, OnInit } from '@angular/core';

import { Http, Response }   from '@angular/http';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { Observable }       from 'rxjs/Observable';

import { PaymentsService }  from '../../common/services/payment.service';

import { Payment }         from '../../common/models/payments';


import 'rxjs';


@Component({
  templateUrl: './payments-search.page.html',
  styleUrls: ['./payments-search.page.css']
})



export class Payment_search_Page {
  PaymentsService        : any;
  detailForm             : boolean;
  search_res             : any;
  paymentdet             : any;

  private ListsearchedStudents: FormGroup;

  private paymentsService: PaymentsService;

  constructor(private ps: PaymentsService,
    private formBuilder: FormBuilder,
    private http: Http) {
    this.paymentsService = ps;
  }

//Get searched student details to show in the frontend..  
similarStudents(search) {
  this.ps.similarPayStudents(search).subscribe(res => {this.search_res = res.item;
});  
}

//show the searched lessons table after the search button is clicked..
showTable(){
this.detailForm = true ;
}

hideTable(){
  this.detailForm = false ;
  }

//Send the student id to lesson_list.page..  
addPayment(paymentdet) {
  this.ps.selpay(paymentdet)
  this.ps.selectpayment.subscribe( paymentdet=> this.paymentdet = paymentdet)
} 

reload(){
  location.reload();
}

ngOnInit(): void {
}

}

