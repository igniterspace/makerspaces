import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { OrdersRoutingModule}     from './orders.routes';
import { DpDatePickerModule }     from 'ng2-date-picker';
//Pages
import { OrdersListPage }         from './pages/list/orders-list.page';
import { OrderItemsViewPage }     from './pages/view/orders-view.page';
import { OrdersEditPage }         from './pages/edit/orders-edit.page';
import { OrdersAddPage }          from './pages/add/add-orders.page';
import { PackOrders }             from './pages/pack/pack.orders.page';
//Services
import { OrdersService }          from '../common/services/order.service';
import { ContextService }         from '../common/services/context.service';
import { OrdersEditService }      from '../common/services/order.service';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface fo more options
  optionValueField: 'id',
  optionTextField : 'text'
};

@NgModule({
  imports       : [ CommonModule, FormsModule, OrdersRoutingModule, ReactiveFormsModule, DpDatePickerModule, NgxSelectModule.forRoot(CustomSelectOptions) ],
  declarations  : [ OrdersListPage, OrderItemsViewPage, OrdersEditPage, OrdersAddPage, PackOrders],
  providers     : [ OrdersService, OrdersEditService]
})
export class OrdersModule { }
