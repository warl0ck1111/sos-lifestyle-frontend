import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ProductRequest} from "../model/product";
import {environment} from "../../environments/environment";

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
    return this.http.get(`${this.PRODUCT_URL}/${id}`,this.getHeaders());
  }

  searchProductByName(name: string) {
    return this.http.get(`${this.PRODUCT_URL}/name/${name}`,this.getHeaders());
  }
  searchProductByBarCode(barcode: string) {
    return this.http.get(`${this.PRODUCT_URL}/barcode/${barcode}`, this.getHeaders());
  }
  //
  // updateProduct(id: number, ProductRequest) {
  //   return this.http.put(`${this.PRODUCT_URL}/${id}`, ProductRequest,this.getHeaders());
  // }

  createProduct(product: ProductRequest) {
    return this.http.post(`${this.PRODUCT_URL}`, product, this.getHeaders());

  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.PRODUCT_URL}/${id}`,this.getHeaders());
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
