import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'rxjs';
import { Product } from 'src/app/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  configUrl = "assets/mock/product.json"

  constructor( private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.configUrl)
  }
}
