import { BrowserModule }            from '@angular/platform-browser';
import { NgModule, ErrorHandler }   from '@angular/core';
import { AppRoutingModule  }        from './app.routes';
import { MiscRoutingModule }        from './misc/misc.routes';
import { DpDatePickerModule }       from 'ng2-date-picker';
import { Ng2SearchPipeModule }      from 'ng2-search-filter';

import { AppComponent }             from './app.component';
import { MenuComponent }            from './common/components/menu/menu.component';
import { HeaderComponent }          from './common/components/header/header.component';

import { DashboardPage }            from './dashboard/dashboard.page';
import { NotFoundPage }             from './misc/notfound.page';
import { CallbackPage }             from './misc/callback/callback.page';
import { LogoutPage }               from './misc/logout.page';
import { StudentsModule }           from './students/students.module';
import { OrdersModule }             from './orders/orders.module';
import { AttendanceModule }         from './attendance/attendance.module';
import { CoursesModule }            from './courses/courses.module';
import { DashboardModule }          from './dashboard/pages/dashboard.module';

import { ContextService }           from './common/services/context.service'
import { AuthService }              from './common/services/auth.service'

import { Http, HttpModule,  RequestOptions }                 from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { FormBuilder, FormGroup, Validators }                from '@angular/forms';
import { ReactiveFormsModule, FormsModule }                  from '@angular/forms'

import { HTTP_INTERCEPTORS }              from '@angular/common/http';
import { HttpHeaderInterceptor }          from './common/services/http.interceptor';
import { AuthErrorHandler }               from './common/services/auth.errorHandler';
import { BrowserAnimationsModule }        from '@angular/platform-browser/animations';



//import { NgDatepickerModule }       from 'ng2-datepicker';
//import {NgSelectModule}             from '@ng-select/ng-select';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'ig_location': '' + window['locationId']}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    DashboardPage,
    NotFoundPage,
    LogoutPage,
    CallbackPage,
    
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    OrdersModule,
    StudentsModule,
    AttendanceModule,
    CoursesModule,
    AppRoutingModule,
    MiscRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule,
    Ng2SearchPipeModule
  ],
  exports: [
    AppComponent
  ],
  providers: [
    ContextService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
