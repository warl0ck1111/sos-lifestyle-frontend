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
import {RouterLinkActiveExactDirective} from "./main/appRouterLinkActiveExact.directive";
import {HeaderComponent} from "./header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {JwtModule} from "@auth0/angular-jwt";
// import {PagesModule} from "./pages/pages.module";


export function tokenGetter() {
  return localStorage.getItem("sos-lifestyle-app");
}
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainComponent,
    RouterLinkActiveExactDirective,
    HeaderComponent,
    SideNavComponent
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
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    // PagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000']
      }
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
