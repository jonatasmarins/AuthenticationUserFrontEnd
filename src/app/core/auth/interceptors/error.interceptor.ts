import { ToastService } from 'src/app/shared/service/toast.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case 0:
              this.spinner.hide();
              return throwError(response);
            case 400:
              if (response.error.errorMessages.length > 0) {
                response.error.errorMessages.forEach(item => {
                  this.toast.showDanger(item.value);
                });
              }
              this.spinner.hide();
              return throwError(response);
            case 401:
            // this.dialog.closeAll();
            // this.authService.logout();
            // this.spinner.hide();
            // return throwError(response);
            case 500:
              // if (response.error.Message) {
              //   let str: string = response.error.Message.toString();
              //   str = str.replace(/[\[\]\"]/g, '');
              //   const strArray: string[] = str.split(',');
              //   strArray.forEach((item, index) => {
              //     // this.toast.showMessage(item);
              //   });
              // }
              this.spinner.hide();
              return throwError(response);
          }
          return throwError(response);
        }
      }));
  }
}
