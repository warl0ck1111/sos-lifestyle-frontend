import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Color, ColorRequest} from "../model/color";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ColorService {


  private baseUrl = `${environment.serverUrl}/api/colors`;

  constructor(private http: HttpClient) { }

  getAllColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.baseUrl}`);
  }

  getColorById(id: number): Observable<Color> {
    return this.http.get<Color>(`${this.baseUrl}/${id}`);
  }

  createColor(colorRequest: ColorRequest): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}`, colorRequest, this.getHeaders());
  }

  updateColor(id: number, colorRequest: ColorRequest): Observable<Color> {
    return this.http.put<Color>(`${this.baseUrl}/${id}`, colorRequest, this.getHeaders());
  }

  deleteColor(id: number): Observable<void> {
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
