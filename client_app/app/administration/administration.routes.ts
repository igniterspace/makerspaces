import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { UsersAddPage }          from './pages/add/users-add.page';
import { UsersListPage }         from './pages/list/users-list.page';
//import { UsersEditPage }         from './pages/edit/users-edit.page';


@NgModule({
    imports: [RouterModule.forChild([
      { path: 'users/add',                        component: UsersAddPage },
      { path: 'users',                            component: UsersListPage }
     // { path: 'users/update/:u.id' ,              component: UsersEditPage }

    ])],
    exports: [RouterModule]
  })
  export class AdministrationRoutingModule {}