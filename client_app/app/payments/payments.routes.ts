import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { Payment_add_Page }         from '../payments/add/payments-add.page';
import { Payment_search_Page }       from '../payments/search/payments-search.page';
import { Payment_List_Page }       from '../payments/list/payments-list.page';

@NgModule({
    imports: [RouterModule.forChild([
      { path: 'payments/list/:s.student_id', component: Payment_List_Page },
      { path: 'payments/add/:s.student_id', component: Payment_add_Page },
      { path: 'payments', component: Payment_search_Page },
    ])],
    exports: [RouterModule]
  })
  export class PaymentsRoutingModule {}