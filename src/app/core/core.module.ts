import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from 'app/core/services/auth.service';
import { JwtAuthService } from 'app/core/services/jwt-auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { LanguageInterceptor } from './interceptors/language-interceptor';
import { NotifyService } from './services/notify.service';

// AoT requires an exported function for factories
export function httpLoaderFactory(handler: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(handler));
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpBackend]
      }
    })
  ],
  providers: [
    ConfirmationService,
    MessageService,
    NotifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: AuthService,
      useClass: JwtAuthService
    }
  ],
  declarations: []
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
