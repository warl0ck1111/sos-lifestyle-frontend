import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {


  profileForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    barCode: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    quantity: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),
    color: new FormControl('' ),
    size: new FormControl(''),
  });


  constructor() {
  }

}
