import { Component } from '@angular/core';
import { User } from './common/models/user';
import { ContextService } from './common/services/context.service'
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContextService, AuthService],
})
export class AppComponent {
  private user: User;

  constructor(private context: ContextService, public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngAfterViewInit() {
  }
}
