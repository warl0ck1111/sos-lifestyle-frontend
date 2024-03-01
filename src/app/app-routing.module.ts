import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
    {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
    {
        path: 'product',
        canActivate: [AuthGuard],
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    },
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
