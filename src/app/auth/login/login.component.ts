import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {ApiSuccessResponse, AuthenticationResponse} from "../../model/user-auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "../../model/http-response";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomValidators} from "../../_helpers/custom-validators";
import {CredentialsService} from "../../services/credentials.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;


  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });
  private userIsLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router,
              private snackbar: MatSnackBar, public dialog: MatDialog,
              private credentialService: CredentialsService
  ) {
    this.userIsLoggedIn = credentialService.isAuthenticated()


  }

  ngOnInit() {
    if (this.userIsLoggedIn) {
      console.log("userIsLoggedIn:" + this.userIsLoggedIn);
      this.router.navigateByUrl("/product").then(() => window.location.reload());
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login({
        username: this.username.value,
        password: this.password.value
      }).pipe(
        tap(() => this.router.navigate(['/product']).then(() => window.location.reload()))
      ).subscribe((response: ApiSuccessResponse<AuthenticationResponse>) => {
          console.log("login/response:" + JSON.stringify(response));

        },
        (error: HttpErrorResponse) => {
          console.log("login/error:" + JSON.stringify(error))
          this.snackbar.open(error.error.message, 'Close')
        })
    }
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


export interface DialogData2 {
  animal: string;
  name: string;
}

@Component({
  selector: 'registration-dialog',
  templateUrl: 'registration-dialog.html',

})
export class RegistrationDialogComponent {
  registrationForm!: FormGroup;

  constructor(private userService: AuthService,
              private snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<RegistrationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData2,
  ) {
  }


  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.registrationForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        // role: new FormControl(null, [Validators.required]),
        passwordConfirm: new FormControl('', [Validators.required])
      },
      {validators: CustomValidators.passwordsMatching}
    );
  }

  register() {
    if (this.registrationForm.valid) {
      this.userService.register({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        username: this.username.value,
        email: this.email.value,
        dateOfBirth: this.dateOfBirth.value,
        gender: this.gender.value,
        password: this.password.value,
        role: 'STAFF',
      }).pipe(
        tap(() => this.onNoClick()
        )
      ).subscribe((response: ApiSuccessResponse<AuthenticationResponse>) => {
          console.log("register/response:" + JSON.stringify(response));
        },
        (error: HttpErrorResponse) => {
          console.log("login/error:" + JSON.stringify(error))
          this.snackbar.open(error.error.message, 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
        })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  get dateOfBirth(): FormControl {
    return this.registrationForm.get('dateOfBirth') as FormControl;
  }

  get gender(): FormControl {
    return this.registrationForm.get('gender') as FormControl;
  }


  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.registrationForm.get('passwordConfirm') as FormControl;
  }

}
