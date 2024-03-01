import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { UsersComponent } from './users/users.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    UserProfileComponent,
    UsersComponent,
    ChangePasswordComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        NgbTooltip,
        MatSortModule,
        MatCardModule,
      MatFormFieldModule
    ]
})
export class UsersModule { }
