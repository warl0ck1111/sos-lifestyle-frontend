import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
      private _fb: FormBuilder,

      private userService: UserService,
      private _dialogRef: MatDialogRef<UserProfileComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private snackbar: MatSnackBar
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
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
}
