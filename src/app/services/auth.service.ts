import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {
  ApiSuccessResponse,
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterUserRequest
} from "../model/user-auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `http://localhost:8080/api/v1/auth`;
  isUserLoggedIn$ = new BehaviorSubject(false);
  userAccessToken$ = new BehaviorSubject('');
  userRefreshAccessToken$ = new BehaviorSubject('');


  constructor(private http: HttpClient, private snackbar: MatSnackBar,
              private jwtService: JwtHelperService, private router:Router) {

  }

  login(user: AuthenticationRequest): Observable<ApiSuccessResponse<AuthenticationResponse>> {
    return this.http.post<ApiSuccessResponse<AuthenticationResponse>>(`${this.baseUrl}/`, user).pipe(
      tap((response: ApiSuccessResponse<AuthenticationResponse>) => {
        localStorage.setItem('sos-lifestyle-app', response.data.accessToken)
        localStorage.setItem('sos-lifestyle-isUserLoggedIn', JSON.stringify(true))
        this.isUserLoggedIn$.next(true);
        this.userAccessToken$.next(response.data.accessToken);
        this.userRefreshAccessToken$.next(response.data.refreshToken);
      }),
      tap(() => this.snackbar.open('Login Successful', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      }))
    );
  }


  register(registerUserRequest: RegisterUserRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, registerUserRequest, this.getHeaders()).pipe(
      tap((res: ApiSuccessResponse<AuthenticationResponse>) => localStorage.setItem('sos-lifestyle-app', res.data.accessToken)),
      tap(() => this.snackbar.open('Registration Successful', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })));
  }


  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("sos-lifestyle-app")}`

      })
    };
  }

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }

  logoutUser() {
    localStorage.removeItem("sos-lifestyle-app")
    localStorage.removeItem("sos-lifestyle-isUserLoggedIn")
    this.isUserLoggedIn$.next(false);
    this.userAccessToken$.next('');
    this.router.navigateByUrl('');

  }
}
