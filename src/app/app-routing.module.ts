import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [


  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: '', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: '', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'product', loadChildren:()=> import('./product/product.module').then(m=>m.ProductModule)},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
