import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { CUBErrorHandler } from 'app/core/cub-error-handler';
import { BaseLayoutComponent } from 'app/layouts/base-layout/base-layout.component';
import { ForbiddenComponent } from 'app/pages/forbidden/forbidden.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';
import { SharedPrimengModule } from 'app/shared-primeng/shared-primeng.module';
import { SharedModule } from 'app/shared/shared.module';
import { environment } from 'env/environment';
import {
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client';

import { FooterComponent } from './layouts/components/footer/footer.component';
import { TopbarComponent } from './layouts/components/topbar/topbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { TranslateService } from '@ngx-translate/core';
import { I18n } from './core/enums/i18n.enum';
import { SsoComponent } from './pages/sso/sso.component';

const userManagerFactory = () => {
  const config: UserManagerSettings = {
    authority: environment.stsAuthority,
    client_id: 'simple-web',
    redirect_uri: `${location.origin}/assets/oidc-login-redirect.html`,
    scope: 'openid UserDataApi userInfo',
    response_type: 'id_token token',
    post_logout_redirect_uri: `${location.origin}/logout`,
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 2 * 60,
    silent_redirect_uri: `${location.origin}/assets/oidc-silent-renew.html`,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  };

  const userManager = new UserManager(config);
  userManager.events.addUserSignedOut(e => {
    userManager.signoutRedirect();
  });

  return userManager;
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedPrimengModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: CUBErrorHandler
    },
    {
      provide: UserManager,
      useFactory: userManagerFactory
    }
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    NotFoundComponent,
    LogoutComponent,
    TopbarComponent,
    ForbiddenComponent,
    LandingComponent,
    LoginComponent,
    FooterComponent,
    SsoComponent
  ]
})
export class AppModule {}

export function appInit(translate: TranslateService) {
  return () => {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(I18n.zhTw);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(I18n.zhTw);
  };
}
