import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SystemMenuItem } from 'app/core/interfaces/system-menu-item';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/primeng';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { FeatureService } from 'app/pages/feature/services/feature.service';
import { MenuService } from 'app/pages/menu/services/menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  private menuItems$: Observable<MenuItem[]>;
  private reload$: BehaviorSubject<boolean>;
  @ViewChild('sidebarMenu')
  sidebarMenu: PanelMenu;
  // 左邊選單
  sidebarItems: MenuItem[] = [];

  breadItems$: Observable<MenuItem[]>;
  searchKey: string;
  results: string[];
  menudisplay: boolean;

  constructor(
    private menuService: MenuService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menudisplay = true;

    this.reload$ = new BehaviorSubject(true);

    this.menuItems$ = this.reload$.pipe(
      switchMap(() => this.menuService.getSystemMenuItems()),
      map(items => {
        // 轉換系統選單到可用的格式
        const transformItems = (
          systemMenuItems: SystemMenuItem[]
        ): MenuItem[] => {
          return systemMenuItems.map(systemMenuItem => {
            return {
              label: !isNullOrUndefined(systemMenuItem.menuCode)
                ? systemMenuItem.displayText +
                  '(' +
                  systemMenuItem.menuCode +
                  ')'
                : systemMenuItem.displayText,
              routerLink:
                systemMenuItem.menuCode != null &&
                systemMenuItem.linkUrl != null
                  ? systemMenuItem.linkUrl
                  : '',
              items:
                systemMenuItem.subMenuList &&
                systemMenuItem.subMenuList.length > 0
                  ? transformItems(systemMenuItem.subMenuList)
                  : null
            };
          });
        };
        return transformItems(items);
      }),
      tap(items => {
        this.sidebarItems = items;

        // Hard Code Example Menu Item
        this.sidebarItems = this.sidebarItems.concat({
          label: '範例功能',
          items: [
            {
              label: '異常模組範例',
              routerLink: '/sandbox/exception-demo'
            },
            {
              label: '熔斷機制範例',
              routerLink: '/sandbox/fusing-mechanism-demo'
            },
            {
              label: '日期選擇器',
              routerLink: '/sandbox/calendar-demo'
            },
            {
              label: '縣市選擇器',
              routerLink: '/sandbox/select-city-demo'
            },
            {
              label: '檔案上傳',
              routerLink: '/sandbox/upload-demo'
            },
            {
              label: '群組勾選',
              routerLink: '/sandbox/checkboxgroup'
            },
            {
              label: '表單驗證',
              routerLink: '/sandbox/formvalidation'
            }
          ]
        });
      })
    );

    this.translate.onLangChange.subscribe(this.reload$);

    this.breadItems$ = combineLatest(
      this.menuService.currentPath$,
      this.menuItems$
    ).pipe(
      map(([url, _]) => this.findBreadItems(url, this.sidebarItems)),
      filter(items => items.length > 0)
    );
  }

  autoComplete(event) {
    this.results = this.filterMenuItemBy(event.query).map(x => x.label);
  }

  private filterMenuItemBy(key) {
    return this.expandMenuItem(this.sidebarItems).filter(x =>
      x.label.includes(key)
    );
  }

  private expandMenuItem(items: MenuItem[]): MenuItem[] {
    return items.reduce(
      (pre, curr) =>
        pre.concat(curr, this.expandMenuItem((curr.items || []) as MenuItem[])),
      []
    );
  }
  goSearch(event) {
    if (this.searchKey) {
      const menuItem = this.filterMenuItemBy(this.searchKey)[0];
      if (menuItem) {
        this.sidebarMenu.collapseAll();
        this.sidebarMenu.handleClick(event, menuItem);
        if (menuItem.routerLink) {
          const activatedMenu = this.sidebarItems.find((el: any) => {
            return el.items.some(e => e.routerLink === menuItem.routerLink);
          });
          activatedMenu.expanded = true;
          this.router.navigate([menuItem.routerLink]);
        }
      }
    }
  }

  menuToggle() {
    this.menudisplay = !this.menudisplay;
  }

  findBreadItems(link: string, items: MenuItem[]): MenuItem[] {
    const appendNextBread = (
      findLink: string,
      subItems: MenuItem[],
      path: string[]
    ) => {
      for (const subItem of subItems as MenuItem[]) {
        if (appendBread(findLink, subItem, path).length > 0) {
          return [...path, subItem.label];
        }
      }
      return [];
    };

    const appendBread = (findLink: string, item: MenuItem, path: string[]) => {
      if (item.routerLink === findLink) {
        return [item.label];
      }

      if (item.items && item.items.length > 0) {
        const nextPath = [...path, item.label];
        return appendNextBread(findLink, item.items as MenuItem[], nextPath);
      }

      return [];
    };

    for (const item of items) {
      const path = appendBread(link, item, []);
      if (path.length > 0) {
        return path.map(text => <MenuItem>{ label: text });
      }
    }
    return [];
  }
}
