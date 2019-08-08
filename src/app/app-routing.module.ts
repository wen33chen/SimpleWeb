import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from 'app/pages/forbidden/forbidden.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { BaseLayoutComponent } from 'app/layouts/base-layout/base-layout.component';
import { LandingComponent } from 'app/pages/landing/landing.component';
import { PermissionGuard } from './core/guards/permission.guard';
import { SsoComponent } from './pages/sso/sso.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: 'rolelist',
        loadChildren: './pages/rolelist/rolelist.module#RoleListModule'
      },
      {
        path: 'featuregroup',
        loadChildren:
          './pages/featuregroup/featuregroup.module#FeaturegroupModule'
      },
      {
        path: 'rolefeature',
        loadChildren: './pages/rolefeature/rolefeature.module#RolefeatureModule'
      },
      {
        path: 'feature',
        loadChildren: './pages/feature/feature.module#FeatureModule'
      },
      {
        path: 'sandbox',
        loadChildren: './pages/sandbox/sandbox.module#SandboxModule'
      },
      {
        path: 'menu',
        loadChildren: './pages/menu/menu.module#MenuModule'
      }
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sso',
    component: SsoComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
