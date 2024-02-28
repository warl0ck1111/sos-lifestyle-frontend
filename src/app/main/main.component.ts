import {Component, computed, signal} from '@angular/core';
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
  constructor(private sidebarService: SidebarService,
              private authService:AuthService,
              private router:Router,
              private _formBuilder: FormBuilder) {
    this.userIsLoggedIn = localStorage.getItem("sos-lifestyle-isUserLoggedIn") != null ;
    console.log("this.authService.isUserLoggedIn$.value:"+JSON.stringify(this.authService.isUserLoggedIn$.value))

  }

  userIsLoggedIn!:boolean;

  collapsed = signal (false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');


  ngOnInit() {
    // this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
    //    console.log(isVisible)
    //    this.isSidebarVisible = isVisible;
    // });

  }

  logout() {
    this.authService.logoutUser();

  }

  goToProducts() {
    this.router.navigate(["product"])
  }

  goToSales() {
    this.router.navigate(["product/sales"])

  }
}
