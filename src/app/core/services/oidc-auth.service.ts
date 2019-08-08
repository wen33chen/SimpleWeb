import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { UserManager } from 'oidc-client';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class OidcAuthService extends AuthService {
  // user$ = new ReplaySubject<User>(1);
  // isLoggedIn$ = new ReplaySubject<boolean>(1);

  constructor(private userManager: UserManager) {
    // this.getUser().subscribe(this.user$);
    // this.getUser()
    //   .pipe(map(user => user && user.access_token && !user.expired))
    //   .subscribe(this.isLoggedIn$);
    super();
  }

  getProfile() {
    return from(this.userManager.getUser()).pipe(
      filter(user => !!user),
      map(user => user.profile)
    );
  }

  login(): Observable<any> {
    return from(this.userManager.signinRedirect());
  }

  logout(): Observable<any> {
    return from(this.userManager.signoutRedirect());
  }

  getToken() {
    return from(this.userManager.getUser()).pipe(
      map(user => (user || { access_token: '' }).access_token)
    );
  }
  setToken(token) {}

  isTokenExpired() {
    return from(this.userManager.getUser()).pipe(
      map(user => !user || !user.access_token || user.expired)
    );
  }
}
