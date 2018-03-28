import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';

import { HttpModule }               from '@angular/http';
import { PaymentsService }          from '../common/services/payment.service';
import { ContextService }           from '../common/services/context.service';
import { BrowserModule }            from '@angular/platform-browser';
import { DpDatePickerModule }       from 'ng2-date-picker';
import { Ng2SearchPipeModule }      from 'ng2-search-filter';

import { PaymentsRoutingModule }     from './payments.routes';
import { Payment_add_Page }          from '../payments/add/payments-add.page';
import { Payment_search_Page }       from '../payments/search/payments-search.page';
import { Payment_List_Page }       from '../payments/list/payments-list.page';

@NgModule({

  imports:      [ CommonModule, FormsModule, PaymentsRoutingModule,ReactiveFormsModule, HttpModule, BrowserModule, DpDatePickerModule,Ng2SearchPipeModule ],
  declarations: [ Payment_add_Page, Payment_search_Page, Payment_List_Page ],

  providers:    [ PaymentsService ]
})
export class PaymentsModule {

}
