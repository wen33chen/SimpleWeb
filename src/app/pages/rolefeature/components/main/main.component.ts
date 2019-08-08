import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { setSortAndPage } from 'app/shared/functions/setSortAndPage';
import { environment } from 'env/environment';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { finalize, share, switchMap, tap } from 'rxjs/operators';
import { RolefeatureData } from '../../interfaces/rolefeature-data';
import { RolefeatureService } from '../../services/rolefeature.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  pageSize = environment.defaultPageSize;

  loading = true;
  sortAndPage$ = new Subject<[SortInfo, PaginatinoInfo]>();
  delete$ = new BehaviorSubject<null>(null);

  roleFeatures$: Observable<PageList<RolefeatureData>>;

  constructor(
    private router: Router,
    private rolefeatureService: RolefeatureService
  ) { }

  ngOnInit() {
    this.roleFeatures$ = combineLatest(
      this.sortAndPage$,
      this.delete$
    ).pipe(
      tap(_ => this.loading = true),
      switchMap(([[sort, page]]) => this.rolefeatureService.getRoleFeatures(sort, page)),
      tap(_ => this.loading = false),
      share()
    );
  }

  lazyLoad(event: LazyLoadEvent) {
    setSortAndPage(this.sortAndPage$, event);
  }

  handleEdit(roleId: number) {
    this.router.navigate(['/rolefeature/edit', roleId]);
  }
}
