import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AuthModule} from "./auth/auth.module";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MainComponent } from './main/main.component';
import {HeaderComponent} from "./header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {JwtModule} from "@auth0/angular-jwt";
import {MatDialogModule} from "@angular/material/dialog";
import { CustomSideNavComponent } from './custom-side-nav/custom-side-nav.component';
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';


export function tokenGetter() {
  return localStorage.getItem("sos-lifestyle-app-accessToken");
}
@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        MainComponent,
        HeaderComponent,
        CustomSideNavComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    // PagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080']
      }
    }),
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule


  ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
