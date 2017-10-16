import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { DashboardPage }       from './dashboard/dashboard.page';
import { CallbackPage }       from './misc/callback/callback.page';
import { LogoutPage }       from './misc/logout.page';

const appRoutes: Routes = [
  {
    path: 'home',
    component: DashboardPage
  },
  {
    path: 'logout',
    component: LogoutPage
  },
  { 
    path: 'callback', 
    component: CallbackPage 
  },
  { 
    path: '',   
    redirectTo: 'home', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
