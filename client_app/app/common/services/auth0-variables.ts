interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'SBuTD8Mj-hpee4a30cOWu28TXTuVWytO',
  domain: 'igniterglobal.auth0.com',
  //callbackURL: window.location.origin.split('?')[0].replace(new RegExp("^[/]+"), '') + '/callback',
  callbackURL: getCallbackUrl()
};

function getCallbackUrl(): string {
  var origin = window.location.origin;

  return origin + '/callback';
}