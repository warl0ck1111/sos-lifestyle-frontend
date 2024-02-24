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

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  private createProductFormGroup: FormGroup<{ quantity: FormControl<string | null>; color: FormControl<string | null>; size: FormControl<string | null>; price: FormControl<string | null>; brandId: FormControl<string | null>; description: FormControl<string | null>; productName: FormControl<string | null>; categoryId: FormControl<string | null>; barCode: FormControl<string | null> }>;





  constructor(private categoryService:CategoryService, private colorService:ColorService,
              private brandService:BrandService, private _snackBar: MatSnackBar) {
    this.createProductFormGroup = new FormGroup({
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
  }

  ngOnInit(){
    this.getCategories();
    this.getColors();
    this.getBrands();
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

}
