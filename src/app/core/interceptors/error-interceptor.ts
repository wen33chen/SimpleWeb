import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/core/services/auth.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

import { NotifyService } from '../services/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notifyService: NotifyService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  correlationFlag = 'x-isshowcorrelationflag';
  correlationId = 'x-correlation-id';
  generalLang = this.translate.instant('general');
  errorLang = this.translate.instant('error');
  logoutLang = this.translate.instant('general.logout');

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      concatMap(event => {
        if (event instanceof HttpResponse && event.body) {
          if (event.body.isSuccess === false) {
            let message = event.body.returnMessage;
            const flag = event.headers.get(this.correlationFlag);
            if (flag) {
              message += `，Trace Id:${event.headers.get(this.correlationId)}`;
            }
            this.notifyService
              .confirmAcceptOnly(message, this.errorLang['notifyErrorTitle'])
              .subscribe();

            return throwError(event.body);
          }

          return of(event.clone({ body: event.body.data || event.body }));
        }
        return of(event);
      }),
      catchError(e => {
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401) {
            console.log(this.logoutLang['login']);
            this.notifyService
              .confirmAcceptOnly(
                this.logoutLang['login'],
                this.generalLang['notifyTitle']
              )
              .subscribe(_ => {
                this.authService.logout();
              });
            return EMPTY;
          } else if (e.status === 403) {
            this.router.navigate(['/403']);
            return EMPTY;
          } else if (e.status === 500) {
            if (e.error.isSuccess !== true) {
              let message = e.error.returnMessage;
              const flag = e.headers.get(this.correlationFlag);
              if (flag) {
                message += `，${e.headers.get(this.correlationId)}`;
              }
              this.notifyService
                .confirmAcceptOnly(message, this.errorLang['notifyErrorTitle'])
                .subscribe();
              return EMPTY;
            }
          }
          return throwError(e.error);
        }
        return throwError(e);
      })
    );
  }
}
