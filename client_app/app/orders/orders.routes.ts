import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { OrdersListPage }           from './pages/list/orders-list.page';
import { OrdersEditPage }           from './pages/edit/orders-edit.page';
import { OrdersViewPage }           from './pages/view/orders-view.page';

@NgModule({
    imports: [RouterModule.forChild([
      { path: 'orders', component: OrdersListPage },
      { path: 'orders/:orderId/edit', component: OrdersEditPage },
      { path: 'orders/create', component: OrdersEditPage },
      { path: 'orders/:orderId', component: OrdersViewPage }
    ])],
    exports: [RouterModule]
  })
  export class OrdersRoutingModule {}