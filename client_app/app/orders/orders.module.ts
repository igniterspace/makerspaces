import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { OrdersRoutingModule}     from './orders.routes';
import { OrdersListPage }         from './pages/list/orders-list.page';
import { OrdersViewPage }         from './pages/view/orders-view.page';
import { OrdersEditPage }         from './pages/edit/orders-edit.page';

import { OrdersService }          from '../common/services/order.service';
import { ContextService }          from '../common/services/context.service';


@NgModule({
  imports:      [ CommonModule, FormsModule, OrdersRoutingModule ],
  declarations: [ OrdersListPage, OrdersViewPage, OrdersEditPage ],
  providers:    [ OrdersService ]
})
export class OrdersModule { }