import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private ROUTE_API = environment.UrlApi;
  private ROUTE_CONTROLLER = 'api/category';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${this.ROUTE_API}/${this.ROUTE_CONTROLLER}`)
      .pipe(map((result: any) => {
        return result.value;
      }));
  }
}
