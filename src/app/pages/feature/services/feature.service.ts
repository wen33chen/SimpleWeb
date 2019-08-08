import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortDirection } from 'app/core/enums/sort-direction.enum';
import { PageList } from 'app/core/interfaces/page-list';
import { PaginatinoInfo } from 'app/core/interfaces/pagination-info';
import { SortInfo } from 'app/core/interfaces/sort-info';
import { Observable, ReplaySubject } from 'rxjs';

import { FeatureData } from '../interfaces/feature-data';
import { FeatureCreate } from '../interfaces/feature-create';
import { FeatureEdit } from '../interfaces/feature-edit';
import { Option } from 'app/core/interfaces/option';
import { containsElement } from '@angular/animations/browser/src/render/shared';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  apiVersion = 'v1';

  roleFeatureCodes$ = new ReplaySubject<string[]>(1);

  constructor(private http: HttpClient) {
    this.getFeaturesByRoleId().subscribe(this.roleFeatureCodes$);
  }

  getFeatures(
    name = '',
    sortInfo: SortInfo = { sortColumn: 'feature', sortBy: SortDirection.asc },
    paginationInfo: PaginatinoInfo = { pageSize: 10, pageNumber: 1 }
  ): Observable<PageList<FeatureData>> {
    const body = {
      featureName: name,
      sortInfo: sortInfo,
      pageSize: paginationInfo.pageSize,
      pageNumber: paginationInfo.pageNumber
    };

    const apiUrl = `/api/${this.apiVersion}/Feature/Filter`;
    return this.http.post<PageList<FeatureData>>(apiUrl, body);
  }

  getFeature(featureId) {
    const apiUrl = `/api/${this.apiVersion}/Feature/${featureId}`;
    return this.http.get<FeatureData>(apiUrl);
  }

  updateFeature(featureData: FeatureEdit) {
    const apiUrl = `/api/${this.apiVersion}/Feature`;
    featureData.featureGroupId = featureData.featureGroupId.id;
    return this.http.put(apiUrl, featureData);
  }

  daleteFeature(featureId) {
    const apiUrl = `/api/${this.apiVersion}/Feature/${featureId}`;
    return this.http.delete(apiUrl);
  }

  createFeature(featureData: FeatureCreate) {
    const apiUrl = `/api/${this.apiVersion}/Feature`;
    featureData.featureGroupId = featureData.featureGroupId.id;
    return this.http.post(apiUrl, featureData);
  }

  getFeatureGroupList() {
    const apiUrl = `/api/${this.apiVersion}/Feature/featureGroup`;
    return this.http.get<Option<number>[]>(apiUrl);
  }

  getFeatureOptions() {
    const apiUrl = `/api/${this.apiVersion}/Feature/FeatureOption`;
    return this.http.get<Option<number>[]>(apiUrl);
  }

  getFeaturesByRoleId() {
    const apiUrl = `/api/${this.apiVersion}/Feature/rolefeature`;
    console.log(this.roleFeatureCodes$);
    console.log(apiUrl,'FFF11');
    return this.http.get<string[]>(apiUrl);
  }
}
