import { ProductComponent } from './product/product.component';
import { NavBarComponent } from './_layout/nav-bar/nav-bar.component';
import { AuthGuardLoginRouterService } from './core/auth/services/guard/auth-guard-login-router.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuardRouterService } from './core/auth/services/guard/auth-guard-router.service';


const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children : [
      { path: '', component: LoginComponent, canActivate: [AuthGuardLoginRouterService] },
      { path: 'product', component: ProductComponent, canActivate: [AuthGuardRouterService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
