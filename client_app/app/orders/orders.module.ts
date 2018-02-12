import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { OrdersRoutingModule}     from './orders.routes';
import { OrdersListPage }         from './pages/list/orders-list.page';
import { OrderItemsViewPage }     from './pages/view/orders-view.page';
import { OrdersEditPage }         from './pages/edit/orders-edit.page';
import { OrdersAddPage }          from './pages/add/add-orders.page';
import { OrdersEditService }      from '../common/services/order.service';
import { OrdersService }          from '../common/services/order.service';
import { ContextService }         from '../common/services/context.service';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  imports       : [ CommonModule, FormsModule, OrdersRoutingModule, ReactiveFormsModule, DpDatePickerModule ],
  declarations  : [ OrdersListPage, OrderItemsViewPage, OrdersEditPage, OrdersAddPage],
  providers     : [ OrdersService, OrdersEditService]
})
export class OrdersModule { }
