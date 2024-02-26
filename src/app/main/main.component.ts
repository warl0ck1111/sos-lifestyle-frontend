import { Component } from '@angular/core';
import {SidebarService} from "../services/sidebar/sidebar.service";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService,
              private authService:AuthService,
              private router:Router,
              private _formBuilder: FormBuilder) {}
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  userIsLoggedIn:boolean= false;



  ngOnInit() {
    // this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
    //    console.log(isVisible)
    //    this.isSidebarVisible = isVisible;
    // });

    this.userIsLoggedIn = this.authService.isUserLoggedIn$.value
  }

  logout() {
    this.authService.logoutUser();

  }

  goToProducts() {
    this.router.navigateByUrl("../products")
  }

  goToSales() {
    this.router.navigateByUrl("../product/sales")

  }
}
