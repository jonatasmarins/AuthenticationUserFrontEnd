import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showStandard(message) {
    this.show(message);
  }

  showSuccess(message = 'Success') {
    this.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(message = 'Error') {
    this.show(message, { classname: 'bg-danger text-light', delay: 15000 });
  }


  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
