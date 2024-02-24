import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "../../model/product";
// import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  PRODUCT_URL:string = 'http://localhost:8080/api/products/';

  constructor(private http: HttpClient) {

  }

  getProducts() {
    return this.http.get(this.PRODUCT_URL);
  }

  getProduct(id: number) {
    return this.http.get(`${this.PRODUCT_URL}/${id}`);
  }
  // updateProduct(id: number, newProperties) {
  //   return this.http.put(`${this.PRODUCT_URL}/${id}`, newProperties);
  // }

  createProduct(product: Product) {
    return this.http.post('${this.PRODUCT_URL}', product);

  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.PRODUCT_URL}/${id}`);
  }



}
