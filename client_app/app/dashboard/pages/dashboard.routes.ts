import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';


import { DashboardPage }            from './view/dashboard.page'

@NgModule({
    imports: [RouterModule.forChild([
       { path: 'dashboard', component: DashboardPage },
    
    ])],
    exports: [RouterModule]
  })
  export class CoursesRoutingModule {}