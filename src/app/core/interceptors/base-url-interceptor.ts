import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'env/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({ url: `${environment.apiUrl}${req.url}` });
    return next.handle(req);
  }
}
