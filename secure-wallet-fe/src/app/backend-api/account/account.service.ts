import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUtils } from 'src/app/core/auth/auth.utils';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router,) {
  }

  set AccessToken(token: string) {
    localStorage.setItem('AccessToken', token);
  }

  get AccessToken(): string {
    return localStorage.getItem('AccessToken') ?? '';
  }



  registerAccount(data: any) {
    return this.http.post<any>(`${this.serverUrl}account/register`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  check(): Observable<boolean> {

    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.AccessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.AccessToken)) {
      return of(false);
    }
    return of(false);
  }


  login(data: any): Observable<any> {

    return this.http.post(`${this.serverUrl}account/login`, data).pipe(
      switchMap((response: any) => {
        if (response.AccessToken) {
          // Store the access token in the local storage
          this.AccessToken = response.AccessToken;

          // Set the authenticated flag to true
          this._authenticated = true;
        }

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  forgot(email: string) {
    return this.http.post<any>(`${this.serverUrl}account/forgot/` + email, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  reset(email: string, otp: string) {
    return this.http.post<any>(`${this.serverUrl}account/reset/` + email + '/' + otp, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('AccessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  userDetails() {
    return this.http.get<any>(`${this.serverUrl}account/userdetails`);
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.serverUrl}account/changepassword`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  updateProfile(data: any) {
    return this.http.patch<any>(`${this.serverUrl}account/updateprofile`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

}
