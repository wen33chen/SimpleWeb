import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { NotifyService } from 'app/core/services/notify.service';
import { FeaturegroupData } from 'app/pages/featuregroup/interfaces/featuregroup-data';
import { FeaturegroupService } from 'app/pages/featuregroup/services/featuregroup.service';
import { setSortAndPage } from 'app/shared/functions/setSortAndPage';
import { environment } from 'env/environment';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  filter,
  finalize,
  share,
  switchMap,
  switchMapTo,
  tap
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
  sortAndPage$ = new Subject<[SortInfo, PaginatinoInfo]>();
  delete$ = new BehaviorSubject<null>(null);

  featureGroups$: Observable<PageList<FeaturegroupData>>;

  constructor(
    private router: Router,
    private featuregroupService: FeaturegroupService,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.featureGroups$ = combineLatest(
      this.keyword$,
      this.sortAndPage$,
      this.delete$
    ).pipe(
      tap(_ => (this.loading = true)),
      switchMap(([keyword, [sort, page]]) =>
        this.featuregroupService.getFeatureGroups(keyword, sort, page).pipe(
          finalize(() => {
            this.loading = false;
          })
        )
      ),
      tap(_ => {
        setTimeout(() => {
          this.loading = false;
        });
      }),
      share()
    );
  }

  filter() {
    this.keyword$.next(this.keyword);
  }

  lazyLoad(event: LazyLoadEvent) {
    setSortAndPage(this.sortAndPage$, event);
  }

  handleAdd() {
    this.router.navigate(['/featuregroup/create']);
  }
  handleEdit(FeatureGroupId: number) {
    this.router.navigate(['/featuregroup/edit', FeatureGroupId]);
  }

  handleDelete(FeatureGroupId: number) {
    const generalLang = this.translate.instant('general');
    this.notifyService
      .confirm(
        generalLang['deleteConfirmMessage'],
        generalLang['deleteConfirmHeader']
      )
      .pipe(
        filter(result => result),
        tap(_ => (this.loading = true)),
        switchMapTo(
          this.featuregroupService.deleteFeatureGroup(FeatureGroupId)
        ),
        tap(_ => (this.loading = false)),
        tap(_ => this.delete$.next(null)),
        tap(_ =>
          this.notifyService.notify(
            NotifySeverity.success,
            generalLang['success'],
            generalLang['successDelete']
          )
        )
      )
      .subscribe();
  }
}
