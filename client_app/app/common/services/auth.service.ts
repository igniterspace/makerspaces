import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: 'http://makerspaces.igniter.global/api',
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile email full_access'
  });

  userProfile: any;

  constructor(public router: Router) {}

  public login(): void {
    console.log("at login");
    this.auth0.authorize();
  }

  public handleAuthentication(): void {

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("hndling loging");
        //window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home'], { queryParamsHandling: 'merge' }); 

      } else if (err) {
        console.log("eerr handling");
        this.router.navigate(['/home'], { queryParamsHandling: 'merge' });
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
    //window.location.href = window.location.href;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      let err = new Error('Access token must exist to fetch profile');
      err['rejection'] = { status: 401 };
      throw err;
    }
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.clear();
    // Go back to the home route
        /* this.auth0.logout({
            returnTo: 'http://localhost:4200/home',
            clientID: AUTH_CONFIG.clientID
          }); */
    this.router.navigate(['/logout']);
  } 

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}