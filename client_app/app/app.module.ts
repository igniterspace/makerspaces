import { BrowserModule }            from '@angular/platform-browser';
import { NgModule, ErrorHandler }   from '@angular/core';

import { AppRoutingModule }         from './app.routes';
import { MiscRoutingModule }        from './misc/misc.routes';

import { AppComponent }             from './app.component';
import { MenuComponent }            from './common/components/menu/menu.component';
import { HeaderComponent }          from './common/components/header/header.component';

import { DashboardPage }            from './dashboard/dashboard.page';
import { NotFoundPage }             from './misc/notfound.page';
import { CallbackPage }             from './misc/callback/callback.page';
import { LogoutPage }               from './misc/logout.page';

import { OrdersModule }             from './orders/orders.module';
import { ContextService }           from './common/services/context.service'
import { AuthService }              from './common/services/auth.service'

import { Http, HttpModule,  RequestOptions }               from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './common/services/http.interceptor';
import { AuthErrorHandler } from './common/services/auth.errorHandler';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

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
    CallbackPage
  ],
  imports: [
    BrowserModule,
    OrdersModule,
    AppRoutingModule,
    MiscRoutingModule,
    BrowserAnimationsModule,
    HttpModule
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
