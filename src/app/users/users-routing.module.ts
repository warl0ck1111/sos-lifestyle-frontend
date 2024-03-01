import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UsersComponent} from "./users/users.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {path:'', component:UsersComponent},
  {path:'change-pwd', component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
