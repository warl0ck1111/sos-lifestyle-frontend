import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SalesComponent} from "./sales/sales.component";
import {CreateProductComponent} from "./create-product/create-product.component";
import {ColorComponent} from "./color/color.component";
import {CategoryComponent} from "./category/category.component";
import {BrandComponent} from "./brand/brand.component";

const routes: Routes = [
  // {path:"", component:ProductComponent},
  // // {path:"product", component:ProductComponent},
  // {path:"create", component:CreateProductComponent},
  // {path:"create/:id", component:CreateProductComponent},
  // {path:"sales", component:SalesComponent},
  // {path:"color", component:ColorComponent},
  // {path:"category", component:CategoryComponent},
  // {path:"brand", component:BrandComponent},
  // {path:"dashboard", component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
