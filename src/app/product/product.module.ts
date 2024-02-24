import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe} from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {NgbHighlight, NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {SalesService} from "../services/sales.service";
import {PagesModule} from "../pages/pages.module";
import {MenuBarComponent} from "./menu-bar/menu-bar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {SalesComponent} from "./sales/sales.component";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateProductComponent } from './create-product/create-product.component';
import {ProductsService} from "../services/products.service";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ColorService} from "../services/color.service";
import {BrandService} from "../services/brand.service";
import {CategoryService} from "../services/category.service";


@NgModule({
  declarations: [
    ProductComponent,
    DashboardComponent,
    MenuBarComponent,
    SalesComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    ProductRoutingModule, ReactiveFormsModule, MatFormFieldModule,
    MatIconModule, NgbPagination,
    FormsModule, NgbHighlight, MatTableModule,
    MatPaginatorModule, MatSortModule, MatInputModule, HttpClientModule,
    MatButtonModule, NgbTooltip, PagesModule, MatSidenavModule, MatListModule,
    MatMenuModule, MatToolbarModule, MatBadgeModule, MatCardModule, MatOptionModule, MatSelectModule,
  ],
  providers:[DecimalPipe, ProductsService, SalesService, ColorService, BrandService, CategoryService]
})
export class ProductModule { }
