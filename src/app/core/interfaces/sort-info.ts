import { SortDirection } from '../enums/sort-direction.enum';

export interface SortInfo {
  sortBy: SortDirection;
  sortColumn: string;
}
