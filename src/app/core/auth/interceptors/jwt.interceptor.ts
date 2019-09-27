import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, catchError, finalize, filter, take } from 'rxjs/operators';
import { AuthUser } from '../login/models/auth-user';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginModel } from '../login/login-model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  user: AuthUser;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.authService.getAuthLogin();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse |
  HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    return next.handle(this.addAccessToken(request, this.user))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((err as HttpErrorResponse).status) {
              case 401:
              if (this.user) {
                return this.handleRefreshToken(request, next, this.user);
              } else {
                return next.handle(request);
              }
            }
          } else {
            return throwError(err);
          }
      }));
  }

  private addAccessToken(request: HttpRequest<any>, currentUser: AuthUser): HttpRequest<any> {
    const loginModel: LoginModel = request.body as LoginModel;
    let refreshToken = false;

    if (loginModel !== null && loginModel.GrantType === 'refresh_token') {
      refreshToken = true;
    }
    if (currentUser && currentUser.token && !refreshToken) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${currentUser.token}`}});
    } else {
      return request;
    }
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler, currentUser: AuthUser) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authService.refreshToken()
        .pipe(
          switchMap((result: AuthUser) => {
            if (result) {
              this.tokenSubject.next(result.token);
              this.localStorageService.setObject('currentUser', result);
              return next.handle(this.addAccessToken(request, result));
            }
            return this.authService.logout() as any;
          }),
          catchError(err => {
            return this.authService.logout() as any;
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;
      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            currentUser.token = token;
            return next.handle(this.addAccessToken(request, currentUser));
        }));
    }
  }
}
