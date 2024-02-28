import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product, ProductRequest} from "../model/product";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  PRODUCT_URL:string = `${environment.serverUrl}/api/products`;



  constructor(private http: HttpClient, private authService:AuthService) {

  }

  getProducts() {
    return this.http.get(`${this.PRODUCT_URL}/`, this.getHeaders());
  }

  getProduct(id: string):Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCT_URL}/${id}`,this.getHeaders());
  }

  searchProductByName(name: string):Observable<Product>  {
    return this.http.get<Product>(`${this.PRODUCT_URL}/name/${name}`,this.getHeaders());
  }
  searchProductByBarCode(barcode: string):Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCT_URL}/barcode/${barcode}`, this.getHeaders());
  }
  //
  updateProduct(id: number, productRequest:ProductRequest) {
    return this.http.put(`${this.PRODUCT_URL}/${id}`, productRequest,this.getHeaders());
  }

  createProduct(product: ProductRequest) {
    return this.http.post(`${this.PRODUCT_URL}/`, product, this.getHeaders());

  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.PRODUCT_URL}/${id}`,this.getHeaders());
  }

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("sos-lifestyle-app")}`

      })
    };
  }

}
