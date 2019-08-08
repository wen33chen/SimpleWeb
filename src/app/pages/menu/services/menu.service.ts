import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortDirection } from 'app/core/enums/sort-direction.enum';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { Observable, ReplaySubject } from 'rxjs';

import { MenuData } from 'app/pages/menu/interfaces/menu-data';
import { SystemMenuItem } from 'app/core/interfaces/system-menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuPathData: Array<MenuData> = [
    { menuId: 0, parentId: 0, displayText: '最上層列表' } as MenuData
  ];
  apiVersion = 'v1';
  currentPath$ = new ReplaySubject<string>(1);
  constructor(private http: HttpClient) {}

  createMenuModel() {
    return new FormGroup({
      menuId: new FormControl(0, Validators.required),
      parentId: new FormControl(null),
      active: new FormControl(false, Validators.required),
      sort: new FormControl(0, Validators.required),
      text: new FormControl(null, Validators.required),
      featureId: new FormControl(null),
      menuCode: new FormControl(null, Validators.required),
      linkUrl: new FormControl(null, Validators.required)
    });
  }

  editMenuModel() {
    return new FormGroup({
      menuId: new FormControl(0, Validators.required),
      parentId: new FormControl(null),
      active: new FormControl(false, Validators.required),
      sort: new FormControl(0, Validators.required),
      text: new FormControl(null, Validators.required),
      featureId: new FormControl(null),
      menuCode: new FormControl(null, Validators.required),
      linkUrl: new FormControl(null, Validators.required)
    });
  }

  getMenus(
    parentId,
    sortInfo: SortInfo = { sortColumn: 'menuId', sortBy: SortDirection.asc },
    paginationInfo: PaginatinoInfo = { pageSize: 10, pageNumber: 1 }
  ): Observable<PageList<MenuData>> {
    const body = {
      parentId: parentId,
      sortInfo: sortInfo,
      pageSize: paginationInfo.pageSize,
      pageNumber: paginationInfo.pageNumber
    };
    const apiUrl = `/api/${this.apiVersion}/menu/Filter`;
    return this.http.post<PageList<MenuData>>(apiUrl, body);
  }

  getMenu(menuId) {
    const apiUrl = `/api/${this.apiVersion}/Menu/${menuId}`;
    return this.http.get<MenuData>(apiUrl);
  }

  updateMenu(menuData: MenuData) {
    const apiUrl = `/api/${this.apiVersion}/Menu`;
    return this.http.put(apiUrl, menuData);
  }

  deleteMenu(menuId) {
    const apiUrl = `/api/${this.apiVersion}/Menu/${menuId}`;
    return this.http.delete(apiUrl);
  }

  createMenu(menuData: MenuData) {
    const apiUrl = `/api/${this.apiVersion}/Menu`;
    return this.http.post(apiUrl, menuData);
  }

  getSystemMenuItems(): Observable<SystemMenuItem[]> {
    const apiUrl = `/api/${this.apiVersion}/menu`;
    return this.http.get<SystemMenuItem[]>(apiUrl);
  }

  resetMenuDatas() {
    this.menuPathData = [
      { menuId: 0, parentId: 0, displayText: '最上層列表' } as MenuData
    ];
  }
}
