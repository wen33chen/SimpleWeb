import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from 'app/core/enums/sort-direction.enum';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { Observable } from 'rxjs';

import { FeaturegroupData } from '../interfaces/featuregroup-data';
import { FeaturegroupCreate } from '../interfaces/featuregroup-cerate';
import { FeaturegroupEdit } from '../interfaces/featuregroup-edit';


@Injectable({
  providedIn: 'root'
})
export class FeaturegroupService {
  apiVersion = 'v1';
  constructor(private http: HttpClient) { }

  getFeatureGroups(
    name = '',
    sortInfo: SortInfo = {
      sortColumn: 'FeatureGroupId',
      sortBy: SortDirection.asc
    },
    paginationInfo: PaginatinoInfo = { pageSize: 10, pageNumber: 1 }
  ): Observable<PageList<FeaturegroupData>> {
    const body = {
      isActive: true,
      featureGroupName: name,
      sortInfo: sortInfo,
      pageSize: paginationInfo.pageSize,
      pageNumber: paginationInfo.pageNumber
    };
    const apiUrl = `/api/${this.apiVersion}/FeatureGroup/Filter`;
    return this.http.post<PageList<FeaturegroupData>>(apiUrl, body);
  }

  getFeatureGroup(FeatureGroupId) {
    const apiUrl = `/api/${this.apiVersion}/FeatureGroup/${FeatureGroupId}`;
    return this.http.get<FeaturegroupData>(apiUrl);
  }

  updateFeatureGroup(featuregroupData: FeaturegroupEdit) {
    const apiUrl = `/api/${this.apiVersion}/FeatureGroup`;
    return this.http.put(apiUrl, featuregroupData);
  }

  deleteFeatureGroup(FeatureGroupId) {
    const apiUrl = `/api/${this.apiVersion}/FeatureGroup/${FeatureGroupId}`;
    return this.http.delete(apiUrl);
  }

  createFeatureGroup(featuregroupData: FeaturegroupCreate) {
    const apiUrl = `/api/${this.apiVersion}/FeatureGroup`;
    return this.http.post(apiUrl, featuregroupData);
  }
}
