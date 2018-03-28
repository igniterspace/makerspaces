import { Component, OnInit, Injectable, Injector  } from '@angular/core';
import { User } from '../../models/user';
import { ContextService } from '../../services/context.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ContextService, AuthService],
})
export class HeaderComponent implements OnInit {
  private permitted: any = {};
  private location = {};
  private objectKeys = Object.keys;
  private currentHref = window.location.href;
  private profile: any;
  private router: any;

  constructor(private context: ContextService, private auth: AuthService, private injector: Injector) {
    this.router = this.injector.get(Router);
    this.initData();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/logout']);
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else if(this.auth.isAuthenticated()){
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile);
      });
    }
  }

  initData(): void {
    if (this.auth.isAuthenticated()) {
      this.context
      .getPermittedLocations()
      .then((permitted) => {
        this.permitted = permitted;
        console.log(this.permitted);
      })
      .catch(error => console.log(error));
    }
    this.context
      .getCurrentLocation()
      .then((location) => {
        this.location = location;
        console.log(this.location);
      })
      .catch(error => console.log(error));
  }
}