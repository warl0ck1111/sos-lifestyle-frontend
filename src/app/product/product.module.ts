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
import { ColorComponent } from './color/color.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import {AppModule} from "../app.module";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    ProductComponent,
    MenuBarComponent,
    CreateProductComponent,
    ColorComponent,
    BrandComponent,
    CategoryComponent,
    SalesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    ProductRoutingModule, ReactiveFormsModule, MatFormFieldModule,
    MatIconModule, NgbPagination,
    FormsModule, NgbHighlight, MatTableModule,
    MatPaginatorModule, MatSortModule, MatInputModule, HttpClientModule,
    MatButtonModule, NgbTooltip, MatSidenavModule, MatListModule,
    MatMenuModule, MatToolbarModule, MatBadgeModule, MatCardModule, MatOptionModule, MatSelectModule, MatGridListModule,
  ],
  providers:[DecimalPipe, ProductsService, SalesService, ColorService, BrandService, CategoryService]
})
export class ProductModule { }
