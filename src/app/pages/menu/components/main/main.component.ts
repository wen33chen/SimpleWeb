import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { MenuService } from 'app/pages/menu/services/menu.service';
import { setSortAndPage } from 'app/shared/functions/setSortAndPage';
import { environment } from 'env/environment';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, share, switchMap, switchMapTo, tap, map } from 'rxjs/operators';
import { MenuData } from '../../interfaces/menu-data';
import { TranslateService } from '@ngx-translate/core';
import { FeatureService } from 'app/pages/feature/services/feature.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  pageSize = environment.defaultPageSize;

  model = this.menuService.editMenuModel();
  title = '';
  addMenuButtonText = '';

  isPeakMenu = false;
  isNotLastMenu = false;
  loading = true;
  menuId$ = new BehaviorSubject<number>(0);
  sortAndPage$ = new Subject<[SortInfo, PaginatinoInfo]>();
  delete$ = new BehaviorSubject<null>(null);

  menus$: Observable<PageList<MenuData>>;
  featureSelectList$: Observable<SelectItem[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private featureService: FeatureService,
    private menuService: MenuService,
    private notifyService: NotifyService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {

    const ddlLang = this.translate.instant('drowdownlistdefault');
    this.featureSelectList$ = this.featureService
    .getFeatureOptions()
    .pipe(
      map(options =>
        [
          { text: <string>ddlLang['noBindToFeature'], id: <number>null },
          ...options
        ].map(x => ({
          label: x.text,
          value: x.id
        }))
      )
    );

    this.menus$ = combineLatest(
      this.menuId$,
      this.sortAndPage$,
      this.delete$
    ).pipe(
      tap(_ => (this.loading = true)),
      switchMap(([menuId, [sort, page]]) =>
        this.menuService.getMenus(menuId, sort, page)
      ),
      tap(_ => {
        setTimeout(() => {
          this.loading = false;
        });
      }),
      share()
    );

    this.route.params
      .pipe(
        tap(param => {
          if (+param['id'] === 0) {
            this.menuService.resetMenuDatas();
            this.setMenuFlag();
          } else {
            this.menuId$.next(this.getLastMenuId());
            this.setMenuFlag();
            this.getMenuData();
          }
          this.setTitle();
          this.setAddMenuButtonText();
        })
      )
      .subscribe();
  }

  lazyLoad(event: LazyLoadEvent) {
    setSortAndPage(this.sortAndPage$, event);
  }

  handleAdd() {
    this.router.navigate(['/menu/create']);
  }

  handleDelete(menuId: number) {
    const featureLang = this.translate.instant(
      'features.features'
    );
    const generalLang = this.translate.instant('general');
    this.notifyService
      .confirm(
        featureLang['deleteFeatureConfirmHeader'],
        featureLang['deleteFeatureConfirmMessage']
      )
      .pipe(
        filter(result => result),
        tap(_ => (this.loading = true)),
        switchMapTo(this.menuService.deleteMenu(menuId)),
        tap(_ => (this.loading = false)),
        tap(_ => this.delete$.next(null)),
        tap(_ =>
          this.notifyService
            .confirmAcceptOnly(
              generalLang['successDelete'],
              generalLang['success']
            )
            .subscribe()
        )
      )
      .subscribe();
  }

  setMenuFlag() {
    this.isPeakMenu = this.menuService.menuPathData.length > 1;
    this.isNotLastMenu = this.menuService.menuPathData.length !== 3;
  }

  back() {
    this.menuService.menuPathData.pop();
    window.history.replaceState({}, '', `/menu/list/${this.getLastMenuId()}`);
    this.menuId$.next(this.getLastMenuId());
    this.setMenuFlag();
    this.setTitle();
    this.setAddMenuButtonText();
    this.getMenuData();
  }

  getMenuChildren(item: MenuData) {
    this.menuService.menuPathData.push(item);
    window.history.replaceState({}, '', `/menu/list/${this.getLastMenuId()}`);
    this.menuId$.next(this.getLastMenuId());
    this.setMenuFlag();
    this.setTitle();
    this.setAddMenuButtonText();
    this.getMenuData();
  }

  getMenuData() {
    if (this.isPeakMenu) {
      this.menuService.getMenu(this.getLastMenuId())
        .subscribe(menuData => {
          this.model.reset(menuData);
          this.model.get('parentId').setValue(menuData.parentId);
          console.log(menuData);
          this.model.get('featureId').setValue(menuData.featureId);
        });
    }
  }

  getLastMenuId() {
    return this.getLastMenu().menuId;
  }

  getLastMenu() {
    return this.menuService.menuPathData[this.menuService.menuPathData.length - 1];
  }

  save() {
    const generalLang = this.translate.instant('general');
    this.menuService
      .updateMenu(this.model.value)
      .subscribe(_ => {
        this.getLastMenu().displayText = this.model.value.text;
        this.setTitle();
        this.notifyService.notify(
          NotifySeverity.success,
          generalLang['success'],
          generalLang['successUpdate']
        );
      });
  }

  setTitle() {
    let title = '';

    this.menuService.menuPathData.forEach((x, index) => {
      title += x.displayText;
      title += (index === this.menuService.menuPathData.length - 1) ? '' : '>';
    });

    this.title = title;
  }

  setAddMenuButtonText() {
    this.addMenuButtonText = this.isPeakMenu ? '新增子選單' : '新增最上層選單';
  }

}
