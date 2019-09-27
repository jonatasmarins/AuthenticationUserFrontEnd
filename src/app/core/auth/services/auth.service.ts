import { JwtHelperService } from '@auth0/angular-jwt';
import { ResultResponseObject } from './../models/result-response';
import { LoginModel } from './../login/login-model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { AuthUser } from '../login/models/auth-user';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  private readonly URL_LOGIN = 'login';
  private readonly URL_CONTROLLER = 'api/auth';
  USER_KEY_LOCAL_STORAGE = 'user';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  login(username: string, pass: string) {

    const request: LoginModel = new LoginModel();
    request.Token = '';
    request.Login = username;
    request.Password = pass;
    request.GrantType = 'password';

    return this.http.
      post(`${environment.UrlApi}/${this.URL_CONTROLLER}/${this.URL_LOGIN}`, request).
      pipe(tap((result: any) => {
        return result;
      }), shareReplay());
  }

  isLoggedIn() {
    const authLogin = this.getAuthLogin();
    const helper = new JwtHelperService();
    if (authLogin && authLogin.token) {
      return !helper.isTokenExpired(authLogin.token);
    }
    return false;
  }

  getExpiration() {
    const authLogin = this.getAuthLogin();
    const helper = new JwtHelperService();
    if (authLogin && authLogin.token) {
      const expiresAt = authLogin.expires;
      return moment(expiresAt);
    }
    return false;
  }

  saveStateUser(authLogin: AuthUser) {
    this.localStorageService.setObject('user', authLogin);
  }

  refreshToken(): Observable<any> {
    const authLogin = this.getAuthLogin();

    const requestLogin: LoginModel = {
      UserID: '',
      GrantType: 'refresh_token',
      Login: 'admin',
      Password: '',
      Token: ''
    };

    let authUser: AuthUser = new AuthUser();

    return this.http
      .post<ResultResponseObject>(`${environment.UrlApi}${this.URL_CONTROLLER}`, requestLogin)
      .pipe(tap((res) => {
        authUser = res.value as AuthUser;
        if (authUser) {
          this.saveStateUser(authUser);
        } else {
          this.logout();
        }
        return authUser;
      }));
  }

  logout() {
    this.localStorageService.set(this.USER_KEY_LOCAL_STORAGE, null);
    this.router.navigate([this.URL_LOGIN]);
  }

  getAuthLogin(): AuthUser {
    const authuser: AuthUser = JSON.parse(this.localStorageService.get('user'));
    return authuser;
  }
}
