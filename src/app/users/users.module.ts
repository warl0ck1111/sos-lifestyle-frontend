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


@NgModule({
  declarations: [
    UserProfileComponent,
    UsersComponent
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
        MatPaginatorModule
    ]
})
export class UsersModule { }
