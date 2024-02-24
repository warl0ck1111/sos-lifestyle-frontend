import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    SideNavComponent,
    FooterComponent,
    HeaderComponent,
    // MenuBarComponent,
  ],
  exports: [
    SideNavComponent,
    FooterComponent,
    HeaderComponent,
    // MenuBarComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ]
})
export class PagesModule { }
