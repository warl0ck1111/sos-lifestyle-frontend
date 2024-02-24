import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartItem} from "../model/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  SALES_URL:string = `${environment.serverUrl}/api/sales`;

  constructor(private http: HttpClient) {

  }

  getAllSales() {
    return this.http.get(this.SALES_URL);
  }

  createSales(cartItem:CartItem[]) {
    return this.http.post(`${this.SALES_URL}`, {items:cartItem},{
      headers: {
      'Content-Type': 'application/json'
    }}
      );
  }

}
