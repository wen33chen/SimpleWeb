import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMapTo, tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { FeatureService } from 'app/pages/feature/services/feature.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {
  constructor(private featureService: FeatureService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const featureCode = childRoute.data && <string>childRoute.data.featureCode;

    if (featureCode) {
      return this.featureService.roleFeatureCodes$.pipe(
        map(codes => codes.includes(featureCode)),
        tap(isPermission => {
          if (!isPermission) {
            this.router.navigate(['403']);
          }
        })
      );
    }

    return true;
  }
}
