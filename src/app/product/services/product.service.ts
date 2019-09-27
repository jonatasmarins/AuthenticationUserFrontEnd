import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductModelRequest } from '../models/product-model-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ROUTE_API = environment.UrlApi;
  private ROUTE_CONTROLLER = 'api/product';
  emittEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getProduct(productName: string = '') {

    const params = new HttpParams().set('name', productName);

    return this.http.get(`${this.ROUTE_API}/${this.ROUTE_CONTROLLER}`, {params})
      .pipe(map((result: any) => {
        return result.value;
      }));
  }

  create(obj: ProductModelRequest) {
    return this.http.post(`${this.ROUTE_API}/${this.ROUTE_CONTROLLER}`, obj)
      .pipe(map((result: any) => {
        return result;
      }));
  }

  update(obj: ProductModelRequest) {
    return this.http.put(`${this.ROUTE_API}/${this.ROUTE_CONTROLLER}`, obj)
      .pipe(map((result: any) => {
        return result;
      }));
  }

  delete(obj: ProductModelRequest) {

    let params = new HttpParams();

    Object.keys(obj).forEach(key => {
      params = params.append(key, obj[key]);
    });

    return this.http.delete(`${this.ROUTE_API}/${this.ROUTE_CONTROLLER}`, {params})
      .pipe(map((result: any) => {
        return result;
      }));
  }
}
