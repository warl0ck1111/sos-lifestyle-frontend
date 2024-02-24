import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from "../model/product";
import {environment} from "../../environments/environment";
// import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  PRODUCT_URL:string = `${environment.serverUrl}/api/products/`;



  constructor(private http: HttpClient) {

  }

  getProducts() {
    return this.http.get(this.PRODUCT_URL, this.getHeaders());
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

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImp0aSI6ImQ0YTc1MjBmLWJhYzQtNGYwMC04MjU1LWQxNjQ3MmQ5ODcyNyIsImlhdCI6MTcwODc5MzAwNSwiZXhwIjoxNzA5Mzk3ODA1fQ.S8ZTziIiC4hitj5ra4Ur_oP6Cz6vSNrqoOuTaUBUnzo'

      })
    };
  }

}
