import {ChangeDetectorRef, Component, computed, OnInit, signal} from '@angular/core';
import {SidebarService} from "../services/sidebar/sidebar.service";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {CredentialsService} from "../services/credentials.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  constructor(private sidebarService: SidebarService,
              private authService:AuthService,
              private router:Router,
              public credentialService:CredentialsService,
              private _formBuilder: FormBuilder) {
    console.log("MainComponent/constructor/this.authService.isUserLoggedIn$.value:"+JSON.stringify(this.authService.isUserLoggedIn$.value))
    console.log("MainComponent/constructor/has been called ")

  }




  userIsLoggedIn:boolean =false;

  collapsed = signal (false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');


  ngOnInit() {
    console.log("MainComponent/ngOnInit/has been called ")

    this.userIsLoggedIn=this.credentialService.isAuthenticated()

    console.log("mainComponent/ngOnInit/credentialService.isAuthenticated():"+JSON.stringify(this.credentialService.isAuthenticated()))


  }

  ngAfterViewInit(){
    console.log("MainComponent/ngAfterViewInit/has been called ")
  }

  logout() {
    if (window.confirm("Are you sure you want to log out")){
      this.authService.logoutUser();
    }

  }

  goToProducts() {
    this.router.navigate(["product"])
  }

  goToSales() {
    this.router.navigate(["product/sales"])

  }
}
