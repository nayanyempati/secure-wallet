import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  UploadFile(files: any): Observable<any> {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<any>(`${this.serverUrl}uploads/upload`, formData)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  UploadFileBlob(files: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', files, files.name);
    return this.http.post<any>(`${this.serverUrl}uploads/upload`, formData)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
