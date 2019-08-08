import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FeatureData } from "../../feature/interfaces/feature-data";

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  apiVersion = 'v1';
  constructor(private http: HttpClient) {}

  getException1(featureId: number) {
    const apiUrl = `/api/${this.apiVersion}/TestException/Store3/${featureId}`;
    return this.http.get<any>(apiUrl);
  }

  getException2(featureId: number) {
    const apiUrl = `/api/${this.apiVersion}/TestException/Store4/${featureId}`;
    return this.http.get<any>(apiUrl);
  }

  postException3(featureName: string) {
    const apiUrl = `/api/${this.apiVersion}/TestException/Store1/`;
    return this.http.post<any>(apiUrl, {
      "featureName" : featureName
    });
  }

  getFusingMechanism() {
    const apiUrl = `/api/${this.apiVersion}/TestException/FusingMechanismAction1/`;
    return this.http.get<any>(apiUrl);
  }
}
