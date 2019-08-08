import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Observable, combineLatest, BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserProfile } from 'app/core/interfaces/user-profile';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18n } from 'app/core/enums/i18n.enum';

const langMapping = new Map<string, string>([
  [I18n.zhTw, '繁體中文'],
  [I18n.zhCn, '简体中文'],
  [I18n.enUs, 'English']
]);

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  lang$: BehaviorSubject<string>;
  topNavItems$: Observable<MenuItem[]>;
  tt: Subscription;
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.lang$ = new BehaviorSubject(this.translate.currentLang);
    this.tt = this.translate.onLangChange
      .pipe(map(x => x.lang))
      .subscribe(this.lang$);

    const langMenuItems: MenuItem[] = [
      {
        label: langMapping.get(I18n.zhTw),
        command: () => this.translate.use(I18n.zhTw)
      },
      {
        label: langMapping.get(I18n.zhCn),
        command: () => this.translate.use(I18n.zhCn)
      },
      {
        label: langMapping.get(I18n.enUs),
        command: () => this.translate.use(I18n.enUs)
      }
    ];

    this.topNavItems$ = this.lang$.pipe(
      tap(x => console.log('lang change', x)),
      switchMap(language =>
        this.authService.getProfile().pipe(
          map(profile => [
            {
              label: langMapping.get(language),
              icon: 'fas fa-globe-asia',
              items: langMenuItems
            },

            {
              label: profile.DeptName,
              icon: 'fas fa-university'
            },
            {
              label: profile.EmpName,
              icon: 'fas fa-user',
              items: [
                {
                  label: this.translate.instant('topbar')['logout'],
                  command: () => this.authService.logout()
                }
              ]
            }
          ])
        )
      )
    );
  }
}
