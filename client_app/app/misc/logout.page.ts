import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service'

@Component({
  template: '<h2>User Logged Out</h2>'
})
export class LogoutPage {

  constructor(private auth: AuthService) {}

  ngAfterViewInit() {
    this.auth.login();
  }

}
