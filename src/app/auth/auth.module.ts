import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {FooterComponent} from "../pages/footer/footer.component";
import {AuthService} from "../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
    exports: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        MatNativeDateModule, MatDatepickerModule,
      MatIconModule, MatButtonModule, MatCheckboxModule,
      MatToolbarModule, FormsModule, MatCardModule, MatFormFieldModule,
      MatInputModule, MatListModule, MatRadioModule,HttpClientModule,


    ],
  providers:[AuthService, JwtHelperService]
})
export class AuthModule { }
