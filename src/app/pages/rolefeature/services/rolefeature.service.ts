import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortDirection } from 'app/core/enums/sort-direction.enum';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { Observable } from 'rxjs';

import { FeatureData } from '../interfaces/feature-data';
import { RolefeatureData } from '../interfaces/rolefeature-data';

@Injectable({
  providedIn: 'root'
})
export class RolefeatureService {
  apiVersion = 'v1';
  constructor(private http: HttpClient) {}

  createRoleModel() {
    return new FormGroup({
      roleName: new FormControl(null, Validators.required),
      roleId: new FormControl(0, Validators.required),
      featureIds: new FormControl([], Validators.required)
    });
  }

  createRolefeatureModel() {
    return new FormGroup({
      roleId: new FormControl(0, Validators.required),
      feature: new FormControl([], Validators.required)
    });
  }

  getRoleFeatures(
    sortInfo: SortInfo = { sortColumn: 'roleId', sortBy: SortDirection.asc },
    paginationInfo: PaginatinoInfo = { pageSize: 10, pageNumber: 1 }
  ): Observable<PageList<RolefeatureData>> {
    const body = {
      sortInfo: sortInfo,
      pageSize: paginationInfo.pageSize,
      pageNumber: paginationInfo.pageNumber
    };
    const apiUrl = `/api/${this.apiVersion}/RoleFeature`;
    return this.http.post<PageList<RolefeatureData>>(apiUrl, body);
  }

  getRolesById(RoleId) {
    const apiUrl = `/api/${this.apiVersion}/RoleFeature/${RoleId}`;
    return this.http.get<RolefeatureData>(apiUrl);
  }

  getFeatures(
    sortInfo: SortInfo = { sortColumn: 'roleId', sortBy: SortDirection.asc },
    paginationInfo: PaginatinoInfo = { pageSize: 10, pageNumber: 1 }
  ): Observable<any[]> {
    const body = {
      sortInfo: sortInfo,
      pageSize: paginationInfo.pageSize,
      pageNumber: paginationInfo.pageNumber
    };
    const apiUrl = `/api/${this.apiVersion}/Feature/List`;
    return this.http.post<any[]>(apiUrl, body);
  }

  updateRole(rolefeatureData: RolefeatureData) {
    const apiUrl = `/api/${this.apiVersion}/RoleFeature`;
    return this.http.patch(apiUrl, rolefeatureData);
  }
}
