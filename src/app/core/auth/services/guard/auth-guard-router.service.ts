import { RouteEnum } from 'src/app/shared/enums/route-enum';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardRouterService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([RouteEnum.Login]);
      return false;
    }
  }
}
