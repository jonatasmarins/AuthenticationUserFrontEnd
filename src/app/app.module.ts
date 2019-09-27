import { AuthGuardLoginRouterService } from './core/auth/services/guard/auth-guard-login-router.service';
import { LoginComponent } from './core/auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductComponent } from './product/product.component';
import { LocalStorageService } from './core/auth/services/local-storage.service';
import { AuthService } from './core/auth/services/auth.service';
import { NavBarComponent } from './_layout/nav-bar/nav-bar.component';
import { AuthGuardRouterService } from './core/auth/services/guard/auth-guard-router.service';
import { ProductDetailComponent } from './product/dialog-modal/product-detail/product-detail.component';
import { ErrorInterceptor } from './core/auth/interceptors/error.interceptor';
import { JwtInterceptor } from './core/auth/interceptors/jwt.interceptor';
import { DropDownCategoryComponent } from './shared/components/drop-down-category/drop-down-category.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastComponent,
    ProductComponent,
    NavBarComponent,
    ProductDetailComponent,
    DropDownCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    OrderModule,
    NgxSpinnerModule,
    CurrencyMaskModule
  ],
  providers: [
    AuthGuardLoginRouterService,
    AuthGuardRouterService,
    LocalStorageService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductDetailComponent
  ]
})
export class AppModule { }
