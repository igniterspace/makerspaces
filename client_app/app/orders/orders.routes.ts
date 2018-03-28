import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListPage }       from './pages/list/orders-list.page';
import { OrdersEditPage }       from './pages/edit/orders-edit.page';
import { OrderItemsViewPage }   from './pages/view/orders-view.page';
import { OrdersAddPage }        from './pages/add/add-orders.page';
import { PackOrders }           from './pages/pack/pack.orders.page';


@NgModule({
    imports: [RouterModule.forChild([
      { path: 'orders',               component: OrdersListPage },
      { path: 'orders/create',        component: OrdersAddPage },
      { path: 'orders/edit',          component: OrdersEditPage },
      { path: 'orders/view/:order_id',component: OrderItemsViewPage },
      { path: 'orders/packs',         component: PackOrders }

    ])],
    exports: [RouterModule]
  })


  export class OrdersRoutingModule {

  }
