import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListPage } from './pages/list/orders-list.page';
import { OrdersEditPage } from './pages/edit/orders-edit.page';
import { OrdersViewPage } from './pages/view/orders-view.page';
import { OrdersAddPage } from './pages/add/add-orders.page';


@NgModule({
    imports: [RouterModule.forChild([
      { path: 'orders', component: OrdersListPage },
      { path: 'orders/create', component: OrdersAddPage },
      { path: 'orders/edit', component: OrdersEditPage }
    ])],
    exports: [RouterModule]
  })
  export class OrdersRoutingModule {

  }
