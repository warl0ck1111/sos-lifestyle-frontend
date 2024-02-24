import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {BrandService} from "../../services/brand.service";
import {finalize} from "rxjs";
import {Category} from "../../model/category";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Brand} from "../../model/brand";
import {ColorService} from "../../services/color.service";
import {Color} from "../../model/color";
import {ProductsService} from "../../services/products.service";
import {ProductRequest} from "../../model/product";
import {Sizes} from "../../model/size";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  createProductFormGroup!: FormGroup;





  constructor(private categoryService:CategoryService,private productService:ProductsService, private colorService:ColorService,
              private brandService:BrandService, private _snackBar: MatSnackBar) {

  }

  ngOnInit(){
    this.getCategories();
    this.getColors();
    this.getBrands();

    this.createProductFormGroup = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      barcode: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      quantity: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      brandId: new FormControl('', [Validators.required]),
      color: new FormControl('' ),
      size: new FormControl(''),
    });
  }

  categories:Category[] = [];
  getCategories(){
    this.categoryService.getAllCategories().pipe(finalize(()=>{

    })).subscribe((result:any)=>{
      this.categories = result
        this.openSnackBar("Success", "Dismiss")

      },
      (error:any)=>{
        this.openSnackBar(error.message, "Dismiss")

      })
  }

brands:Brand[] = [];
  getBrands(){
    this.brandService.getAllBrands().pipe(finalize(()=>{

    })).subscribe((result:any)=>{
      this.brands = result
        // this.openSnackBar("Success", "Dismiss")

      },
      (error:any)=>{
        this.openSnackBar(error.message, "Dismiss")

      })
  }


colors:Color[] = [];
  getColors(){
    this.colorService.getAllColors().pipe(finalize(()=>{

    })).subscribe((result:any)=>{
      this.colors = result
        // this.openSnackBar("Success", "Dismiss")

      },
      (error:any)=>{
        this.openSnackBar(error.message, "Dismiss")

      })
  }






  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  createProduct() {

    //if property doesnt match then do this
    // this.user.Name = this.userForm.get('name').value;
    let productRequest = this.buildProductRequest();
    console.log("createProduct/productRequest:"+JSON.stringify(productRequest))
    this.productService.createProduct(productRequest).pipe(finalize(()=>{

    })).subscribe((result:any)=>{
      this.openSnackBar("product successfully created ", "Dismiss");
    },
      (error:any) => {
        this.openSnackBar(error.message, "Dismiss");

      })
  }

   buildProductRequest():ProductRequest {
    return{
      quantity:this.createProductFormGroup?.get('quantity')?.value as unknown as number,
      size:this.createProductFormGroup?.get('size')?.value as unknown as Sizes,
      price:this.createProductFormGroup?.get('price')?.value as unknown as number,
      color:this.createProductFormGroup?.get('color')?.value as unknown as string,
      brandId:this.createProductFormGroup?.get('brandId')?.value as unknown as number,
      categoryId:this.createProductFormGroup?.get('categoryId')?.value as unknown as number,
      barCode:this.createProductFormGroup?.get('barcode')?.value as unknown as string,
      description:this.createProductFormGroup?.get('description')?.value as unknown as string,
      name:this.createProductFormGroup?.get('name')?.value as unknown as string ,

    }
  }


}
