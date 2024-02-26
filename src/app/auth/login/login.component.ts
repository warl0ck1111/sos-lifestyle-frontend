import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {ApiSuccessResponse, AuthenticationResponse} from "../../model/user-auth";
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "../../model/http-response";
import {hide} from "@popperjs/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;


  loginForm:FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),

  });

  constructor(private authService: AuthService, private router: Router,
              private snackbar: MatSnackBar, ) { }

  login() {
    if (this.loginForm.valid) {
      this.authService.login({
        username: this.username.value,
        password: this.password.value
      }).pipe(
        tap(() => this.gotoCreateProduct())
      ).subscribe((response:ApiSuccessResponse<AuthenticationResponse>)=>{
        console.log("login/response:"+JSON.stringify(response));

      },
        (error:HttpErrorResponse)=>{
          console.log("login/error:"+JSON.stringify(error))
          this.snackbar.open(error.error.message, 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
        })
    }
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }


  gotoCreateProduct() {
    console.log("gotoCreateProduct/clicked")
    // this.router.navigate(['/heroes', { id: heroId }]);

    this.router.navigate(['/product']);
  }

  goToMainPage() {
    this.router.navigate(['/product']);
  }

}
