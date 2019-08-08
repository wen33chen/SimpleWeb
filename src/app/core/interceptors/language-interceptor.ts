import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let payload: any = {
      setHeaders: { 'Accept-Language': this.translate.currentLang }
    };

    return this.route.paramMap.pipe(
      concatMap(params => {
        if (params.has('culture')) {
          payload = {
            ...payload,
            setParams: {
              culture: params.get('culture')
            }
          };
        }
        req = req.clone(payload);
        return next.handle(req);
      })
    );
  }
}
