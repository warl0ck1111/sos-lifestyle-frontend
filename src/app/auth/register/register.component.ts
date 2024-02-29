import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import {AuthService} from "../../services/auth.service";
import {CustomValidators} from "../../_helpers/custom-validators";
import {ApiSuccessResponse, AuthenticationResponse} from "../../model/user-auth";
import {HttpErrorResponse} from "../../model/http-response";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required])
  },
    { validators: CustomValidators.passwordsMatching }
  );
    private userIsLoggedIn!: boolean;

  constructor(private userService: AuthService, private router: Router,
              private snackbar: MatSnackBar) {

      this.userIsLoggedIn = localStorage.getItem("sos-lifestyle-isUserLoggedIn") != null ;
      if (this.userIsLoggedIn){
          this.router.navigate(["product"])
      }
  }

  register() {
    if (this.registrationForm.valid) {
      this.userService.register({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        username: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
        role: 'EMPLOYEE',
      }).pipe(
        tap(() => this.router.navigate(['../login']))
      ).subscribe((response:ApiSuccessResponse<AuthenticationResponse>)=>{
          console.log("register/response:"+JSON.stringify(response));
        },
        (error:HttpErrorResponse)=>{
          console.log("login/error:"+JSON.stringify(error))
          this.snackbar.open(error.error.message, 'Close')
        })
    }
  }

  get firstName(): FormControl {
    return this.registrationForm.get('firstName') as FormControl;
  }
 get lastName(): FormControl {
    return this.registrationForm.get('lastName') as FormControl;
  }
 get role(): FormControl {
    return this.registrationForm.get('role') as FormControl;
  }
 get username(): FormControl {
    return this.registrationForm.get('username') as FormControl;
  }
 get email(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }


  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.registrationForm.get('passwordConfirm') as FormControl;
  }

}
