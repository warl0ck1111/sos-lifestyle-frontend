import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Brand, BrandRequest} from "../model/brand";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = `${environment.serverUrl}/api/brands`;

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}`);
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/${id}`);
  }

  createBrand(brandRequest: BrandRequest): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}`, brandRequest, this.getHeaders());
  }

  updateBrand(id: number, brandRequest: BrandRequest): Observable<Brand> {
    return this.http.put<Brand>(`${this.baseUrl}/${id}`, brandRequest, this.getHeaders());
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
