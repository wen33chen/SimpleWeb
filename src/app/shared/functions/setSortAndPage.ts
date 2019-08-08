import { SortDirection } from 'app/core/enums/sort-direction.enum';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'env/environment';


export function setSortAndPage(sortAndPage: any, event: LazyLoadEvent) {
  sortAndPage.next([
    {
      sortColumn: event.sortField,
      sortBy: event.sortOrder === 1 ? SortDirection.asc : SortDirection.desc
    },
    {
      pageNumber: Math.floor(event.first / environment.defaultPageSize) + 1,
      pageSize: environment.defaultPageSize
    }
  ]);
}
