import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),

  });

  constructor(private router: Router) {
  }

  gotoCreateProduct() {
    console.log("gotoCreateProduct/clicked")
    // this.router.navigate(['/heroes', { id: heroId }]);

    this.router.navigate(['/product']);
  }

  goToMainPage() {
    this.router.navigate(['/product']);
  }



}
