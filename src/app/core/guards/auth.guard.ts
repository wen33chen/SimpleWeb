import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isTokenExpired().pipe(
      tap(isTokenExpired => {
        if (isTokenExpired) {
          this.router.navigate(['/landing']);
        }
      }),
      map(isTokenExpired => !isTokenExpired)
    );
  }
}
