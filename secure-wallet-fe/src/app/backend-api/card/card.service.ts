import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  listCards() {
    return this.http.get<any>(`${this.serverUrl}card/list`);
  }

  addCard(data: any) {
    return this.http.post<any>(`${this.serverUrl}card/add`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  updateCard(data: any, token: string) {
    return this.http.put<any>(`${this.serverUrl}card/update/` + token, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  deleteCards(token: string) {
    return this.http.delete<any>(`${this.serverUrl}card/delete/` + token);
  }

  viewCards(token: string) {
    return this.http.delete<any>(`${this.serverUrl}card/view/` + token);
  }
  searchCard(key: string) {
    return this.http.get<any>(`${this.serverUrl}card/search/` + key);
  }
}
