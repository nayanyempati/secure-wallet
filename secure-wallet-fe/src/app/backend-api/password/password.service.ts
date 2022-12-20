import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  
  listpasswords() {
    return this.http.get<any>(`${this.serverUrl}password/list`);
  }

  searchPassword(key: string) {
    return this.http.get<any>(`${this.serverUrl}password/search/` + key);
  }

  addpassword(data: any) {
    return this.http.post<any>(`${this.serverUrl}password/add`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  updatepassword(data: any, token: string) {
    return this.http.put<any>(`${this.serverUrl}password/update/` + token, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  deletepasswords(token: string) {
    return this.http.delete<any>(`${this.serverUrl}password/delete/` + token);
  }

  viewpasswords(token: string) {
    return this.http.get<any>(`${this.serverUrl}password/view/` + token);
  }
}
