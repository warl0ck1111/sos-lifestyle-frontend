import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./guards/auth.guard";
import { TicketValidationComponent } from './ticket-validation/ticket-validation.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
const routes: Routes = [

  {component:BookTicketComponent, path:""},

  {component:BookTicketComponent, path:"booking"},

  {component:TicketValidationComponent, path:"validation"},
  {component:TicketListComponent, path:"list"},
    {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    // {path: 'users',
    //     canActivate: [AuthGuard],
    //     loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
    // {
    //     path: 'product',
    //     canActivate: [AuthGuard],
    //     loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    // },
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
