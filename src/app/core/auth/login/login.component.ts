import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/shared/service/toast.service';
import { isNullOrUndefined } from 'util';
import { AuthUser } from './models/auth-user';
import { RouteEnum } from 'src/app/shared/enums/route-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.createForm();
    if (this.authService.isLoggedIn()) {
      this.router.navigate([RouteEnum.Product]);
    }
  }
  createForm() {
    this.formLogin = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //#region Area Get
  get form() {
    return this.formLogin;
  }

  get login() {
    return this.form.get('login').value;
  }

  set login(value) {
    this.form.get('login').setValue(value);
  }

  get password() {
    return this.form.get('password').value;
  }

  set password(value) {
    this.form.get('password').setValue(value);
  }

  //#endregion

  logon() {
    if (this.validate()) {
      this.spinner.show();

      this.authService.login(this.login, this.password).subscribe((result) => {
        if (result.value) {
          const authUser = result.value ? result.value as AuthUser : undefined;
          this.authService.saveStateUser(authUser);
          window.location.reload();
          this.spinner.hide();
        } else {
          this.toastService.show('Usuário ou senha invalido');
        }
      });
    }
    this.password = '';
    this.login = '';
  }

  validate(): boolean {
    let validate = true;
    if (isNullOrUndefined(this.login)) {
      this.toastService.show('Usuário é Obrigatório');
      validate = false;
    }

    if (isNullOrUndefined(this.password)) {
      this.toastService.show('Senha é Obrigatório');
      validate = false;
    }
    return validate;
  }

}
