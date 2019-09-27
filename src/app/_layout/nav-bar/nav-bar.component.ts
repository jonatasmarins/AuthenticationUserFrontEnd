import { AuthService } from './../../core/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLogged = false;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  logout() {
    this.authService.logout();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

}
