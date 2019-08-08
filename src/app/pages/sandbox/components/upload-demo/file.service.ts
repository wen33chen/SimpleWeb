import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  apiVersion = 'v1';
  constructor(private http: HttpClient) {}

  post(files: File[], uploadName: string) {
    const formData = new FormData();

    formData.append('uploadName', uploadName);

    files.forEach(file => {
      formData.append('files', file);
    });

    const apiUrl = `/api/${this.apiVersion}/UpLoad`;
    return this.http.post(apiUrl, formData);
  }
}
