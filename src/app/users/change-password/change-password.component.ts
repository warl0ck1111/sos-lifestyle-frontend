import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../_helpers/custom-validators";
import {tap} from "rxjs/operators";
import {HttpErrorResponse} from "../../model/http-response";
import {UserService} from "../user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {


  constructor(private userService: UserService,
              private snackbar: MatSnackBar,
  ) {

  }


  changePasswordForm: FormGroup = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),

      passwordConfirm: new FormControl('', [Validators.required])
    },
    {validators: CustomValidators.passwordsMatching}
  );


  resetPassword() {
    if (this.changePasswordForm.valid) {
      this.userService.resetPassword({
        email: this.email.value,
        password: this.password.value,
      }).pipe(
        tap(() => {
            // this.onNoClick()
          }
        )
      ).subscribe((response: any) => {
          console.log("resetPassword/response:" + JSON.stringify(response));
          this.snackbar.open('password changed successfully', 'Close')
        },
        (error: HttpErrorResponse) => {
          console.log("login/error:" + JSON.stringify(error))
          this.snackbar.open(error.error.message, 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
        })
    }
  }

  get email(): FormControl {
    return this.changePasswordForm.get('email') as FormControl;
  }


  get password(): FormControl {
    return this.changePasswordForm.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.changePasswordForm.get('passwordConfirm') as FormControl;
  }

}
