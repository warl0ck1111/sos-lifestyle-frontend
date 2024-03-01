import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {
  RegisterUserRequest,
  UpdateAppUserProfileRequest,
  UsersListResponse
} from "../model/user.interface";
import {AuthService} from "../services/auth.service";
import {PageableResponse} from "../model/http-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `http://localhost:8080/api/v1`;

  constructor(private http: HttpClient, private authService:AuthService) { }

  activateUserAccount(email: string, token: string): Observable<void> {
    const params = new HttpParams()
        .set('email', email)
        .set('token', token);
    return this.http.put<void>(`${this.baseUrl}/users/enable_acc`, { params }, this.getHeaders());
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/forgot_password`, { email },this.getHeaders());
  }

  resetPassword(resetPasswordRequest: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/reset_password`, resetPasswordRequest,this.getHeaders());
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}/profile`,this.getHeaders());
  }

  updateProfile(userId: string, request: UpdateAppUserProfileRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/update_profile`, request,this.getHeaders());
  }

  getAllUsers(page: number, pageSize: number, sortField: string, sortDirection: string): Observable<PageableResponse<UsersListResponse>> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
        .set('sortField', sortField)
        .set('sortDirection', sortDirection);
    const  headers ={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("sos-lifestyle-app-accessToken")}`

    };
    return this.http.get<any>(`${this.baseUrl}/users`, { params,headers });
  }

  enableUser(email: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${email}/enable_acc`, {},this.getHeaders());
  }

  disableUser(email: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${email}/disable_acc`, {},this.getHeaders());
  }

  lockUserAccount(email: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${email}/lock_acc`, {},this.getHeaders());
  }

  unlockUserAccount(email: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${email}/unlock_acc`, {},this.getHeaders());
  }

  searchUsers(keyword: string, page: number, pageSize: number, sortField: string, sortDirection: string): Observable<any> {
    const params = new HttpParams()
        .set('keyword', keyword)
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
        .set('sortField', sortField)
        .set('sortDirection', sortDirection);
    const  headers ={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("sos-lifestyle-app-accessToken")}`

    };
    return this.http.get<any>(`${this.baseUrl}/search/users`, { params, headers });
  }

  createUser(request:RegisterUserRequest) {
    return this.authService.register(request)
  }

  deleteEmployee(id: number) {
    return of()
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
