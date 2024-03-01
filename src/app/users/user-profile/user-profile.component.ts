import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../user.service";
import {CredentialsService} from "../../services/credentials.service";
import {AuthenticationResponse} from "../../model/user-auth";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  empForm: FormGroup;

  updateProfileForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private _dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private credentialService: CredentialsService,
    private snackbar: MatSnackBar
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      role: '',


    });

    this.updateProfileForm = this._fb.group({
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',


    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);

    this.initializeUserProfileFormWithValues(this.credentialService.credentials);
    this.empForm.setValue({'gender': this.data.gender});
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.userService
          .updateProfile(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.snackbar.open('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              this.snackbar.open(err.message, 'dismiss');
            },
          });
      } else {
        this.userService.createUser(this.empForm.value).subscribe({
          next: (val: any) => {
            this.snackbar.open('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  get phoneNumber(): FormControl {
    return this.empForm.get('phoneNumber') as FormControl;
  }

  get firstName(): FormControl {
    return this.empForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.empForm.get('lastName') as FormControl;
  }

  get role(): FormControl {
    return this.empForm.get('role') as FormControl;
  }

  get username(): FormControl {
    return this.empForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.empForm.get('email') as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.empForm.get('dateOfBirth') as FormControl;
  }

  get gender(): FormControl {
    return this.empForm.get('gender') as FormControl;
  }

  updateProfile() {

  }

  private initializeUserProfileFormWithValues(credentials: AuthenticationResponse | null) {
    if (credentials) {
      this.updateProfileForm = new FormGroup({
        firstName: new FormControl(credentials.firstName, [Validators.required]),
        lastName: new FormControl(credentials.lastName, [Validators.required]),
        username: new FormControl(credentials.username, [Validators.required]),
        email: new FormControl(credentials.emailAddress, [Validators.required]),

      });
    }
  }

}
