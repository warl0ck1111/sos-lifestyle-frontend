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
import {SublevelMenuComponent} from "./pages/side-nav/sublevel-menu-components";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SublevelMenuComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AuthModule,
      MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule,
        MatGridListModule,


    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
