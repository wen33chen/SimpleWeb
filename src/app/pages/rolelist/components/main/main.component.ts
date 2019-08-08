import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { SortDirection } from 'app/core/enums/sort-direction.enum';
import { MultiSelectSortInfo } from 'app/core/interfaces/multi-select-sort-info';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { NotifyService } from 'app/core/services/notify.service';
import {
  ResultOfPageResultOfRoleQueryResult,
  RoleClient,
  RoleQueryCondition,
  SortInfo
} from 'app/shared/swagger-gen';
import { environment } from 'env/environment';
import { LazyLoadEvent } from 'primeng/api';
import { MultiSelect } from 'primeng/components/multiselect/multiselect';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  filter,
  finalize,
  share,
  switchMap,
  switchMapTo,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  pageSize = environment.defaultPageSize;
  keyword = '';

  loading = true;
  keyword$ = new BehaviorSubject<string>('');
  sortAndPage$ = new Subject<PaginatinoInfo>();
  delete$ = new BehaviorSubject<any>(null);

  roles$: Observable<ResultOfPageResultOfRoleQueryResult>;

  @ViewChild('multiselect') multi: MultiSelect;
  selectedOrderColumn: MultiSelectSortInfo[] = [];
  selectedOrderColumn$ = new BehaviorSubject<MultiSelectSortInfo[]>([]);
  orderColumn: MultiSelectSortInfo[] = [
    { label: '角色名稱 ASC', sortColumn: 'roleName', sortBy: SortDirection.asc },
    { label: '角色名稱 DESC', sortColumn: 'roleName', sortBy: SortDirection.desc },
    { label: '啟用 ASC', sortColumn: 'isActive', sortBy: SortDirection.asc },
    { label: '啟用 DESC', sortColumn: 'isActive', sortBy: SortDirection.desc }
  ];

  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private roleClient: RoleClient
  ) { }

  ngOnInit() {
    this.roles$ = combineLatest(
      this.keyword$,
      this.selectedOrderColumn$,
      this.sortAndPage$,
      this.delete$
    ).pipe(
      tap(_ => this.loading = true),
      switchMap(([keyword, selectedOrderColumn, page, _]) =>
        this.roleClient.getRoleList(
          new RoleQueryCondition({
            roleName: keyword,
            pageNumber: page.pageNumber,
            pageSize: page.pageSize,
            sortInfo: selectedOrderColumn.map(SortInfo.fromJS)
          }))
      ),
      tap(_ => this.loading = false),
      share()
    );
  }

  query() {
    this.keyword$.next(this.keyword);
    this.selectedOrderColumn$.next(this.selectedOrderColumn);
  }

  multiSelectClick(event) {
    const val = event.itemValue as MultiSelectSortInfo;
    const isExist = event.value.find(
      (x: MultiSelectSortInfo) => x.label === val.label
    );

    if (isExist) {
      let delIndex = null;
      this.selectedOrderColumn.forEach((x, index) => {
        if (val.sortColumn === x.sortColumn && val.sortBy !== x.sortBy) {
          delIndex = index;
        }
      });

      if (delIndex != null) {
        this.selectedOrderColumn.splice(delIndex, 1);
      }
    }
  }

  lazyLoad(event: LazyLoadEvent) {
    this.sortAndPage$.next({
      pageNumber: Math.floor(event.first / environment.defaultPageSize) + 1,
      pageSize: environment.defaultPageSize
    });
  }

  handleAdd() {
    this.router.navigate(['/rolelist/create']);
  }
  handleEdit(roleId: number) {
    this.router.navigate(['/rolelist/edit', roleId]);
  }

  handleDelete(roleId: number) {
    const generalLang = this.translate.instant('general');
    this.notifyService
      .confirm(
        generalLang['deleteConfirmMessage'],
        generalLang['deleteConfirmHeader']
      )
      .pipe(
        filter(result => result),
        tap(_ => (this.loading = true)),
        switchMapTo(this.roleClient.deleteRole(roleId)),
        tap(x => {
          this.loading = false;
          this.delete$.next(null);
          this.notifyService.notify(
            NotifySeverity.success,
            generalLang['success'],
            generalLang['successDelete']
          );
        })
      )
      .subscribe();
  }
}
