import { Component }      from '@angular/core';
import { User }           from './common/models/user';
import { ContextService } from './common/services/context.service'
import { AuthService }    from './common/services/auth.service';
import { OrdersService }  from './common/services/order.service';


@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css'],
  providers   : [ ContextService, AuthService, OrdersService ],
})
export class AppComponent {
  private user: User;

  constructor(private context: ContextService, public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngAfterViewInit() {
  }
}
