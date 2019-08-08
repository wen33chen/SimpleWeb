import { Profile } from 'app/core/interfaces/profile';
import { Observable } from 'rxjs';

export abstract class AuthService {
  // user$: ReplaySubject<User>;
  abstract isTokenExpired(): Observable<boolean>;

  abstract getProfile(): Observable<Profile>;

  abstract login(): Observable<any>;

  abstract logout(): Observable<any>;

  abstract getToken(): Observable<string>;

  abstract setToken(token): void;
}
