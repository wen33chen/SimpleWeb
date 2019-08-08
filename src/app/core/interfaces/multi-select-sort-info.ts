import { SortDirection } from '../enums/sort-direction.enum';

export interface MultiSelectSortInfo {
  label: string;
  sortBy: SortDirection;
  sortColumn: string;
}
