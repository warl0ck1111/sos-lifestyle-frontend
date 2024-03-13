import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CartItem} from "../model/product";
import {environment} from "../../environments/environment";
import {SalesRequest} from "../model/sale";
import {Observable} from "rxjs";
import {Invoice} from "../model/invoice";

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

  createSales(salesRequest:SalesRequest):Observable<Invoice> {
    return this.http.post<any>(`${this.SALES_URL}`, salesRequest,this.getHeaders());
  }

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("sos-lifestyle-app-accessToken")}`

      })
    };
  }

}
