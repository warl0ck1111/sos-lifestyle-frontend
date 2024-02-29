import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category, CategoryRequest} from "../model/category";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.serverUrl}/api/categories`;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(brandRequest: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, brandRequest, this.getHeaders());
  }

  updateCategory(id: number, brandRequest: CategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, brandRequest, this.getHeaders());
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
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
