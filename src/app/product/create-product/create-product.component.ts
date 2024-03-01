import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {BrandService} from "../../services/brand.service";
import {finalize} from "rxjs";
import {Category} from "../../model/category";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Brand} from "../../model/brand";
import {ColorService} from "../../services/color.service";
import {Color} from "../../model/color";
import {ProductsService} from "../../services/products.service";
import {Product, ProductRequest} from "../../model/product";
import {Sizes} from "../../model/size";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "../../model/http-response";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  createProductFormGroup!: FormGroup;
  productId!: string | null;
  createUpdateButtonTitle:string = 'Create Product';

  constructor(private categoryService: CategoryService, private productService: ProductsService,
              private router: Router,
              private route: ActivatedRoute,
              private colorService: ColorService,
              private brandService: BrandService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.initializeFormDataWithoutValues()
    this.getCategories();
    this.getColors();

    if (this.productId != null) {
      this.createUpdateButtonTitle = "Update Product"
      this.getProduct(this.productId)
    } else {
      this.initializeFormDataWithoutValues()
    }
  }

  categories: Category[] = [];

  getCategories() {
    this.categoryService.getAllCategories().pipe(finalize(() => {

    })).subscribe((result: any) => {
        this.categories = result
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.error.message, "Dismiss")

      })
  }


  colors: Color[] = [];
  nameSearchIsLoading: boolean = false;

  getColors() {
    this.colorService.getAllColors().pipe(finalize(() => {

    })).subscribe((result: any) => {
        this.colors = result
        // this.openSnackBar("Success", "Dismiss")

      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.error.message, "Dismiss")

      })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, );
  }

  createProduct() {

    //if property doesnt match then do this
    // this.user.Name = this.userForm.get('name').value;
    let productRequest: ProductRequest = this.buildProductRequest();
    console.log("createProduct/productRequest:" + JSON.stringify(productRequest))
    this.productService.createProduct(productRequest).pipe(finalize(() => {

    })).subscribe((result: any) => {
        this.openSnackBar("product successfully created ", "Dismiss");
        this.router.navigateByUrl("product").then(() => window.location.reload());
      },
      (error: any) => {
        this.openSnackBar(error.message, "Dismiss");

      })
  }

  buildProductRequest(): ProductRequest {
    return {
      quantity: this.createProductFormGroup?.get('quantity')?.value as unknown as number,
      size: this.createProductFormGroup?.get('size')?.value as unknown as Sizes,
      price: this.createProductFormGroup?.get('price')?.value as unknown as number,
      color: this.createProductFormGroup?.get('color')?.value as unknown as string,
      brand: this.createProductFormGroup?.get('brand')?.value as unknown as string,
      categoryId: this.createProductFormGroup?.get('categoryId')?.value as unknown as number,
      barCode: this.createProductFormGroup?.get('barCode')?.value as unknown as string,
      description: this.createProductFormGroup?.get('description')?.value as unknown as string,
      name: this.createProductFormGroup?.get('productName')?.value as unknown as string,

    }
  }


  searchProductName() {
    this.nameSearchIsLoading = true;
    var productName = this.createProductFormGroup.get('productName')?.value
    this.productService.searchProductByName(productName).pipe(finalize(() => {
      this.nameSearchIsLoading = false;
    }))
      .subscribe((result: Product) => {
          if (result != null) {
            this.initializeFormDataWithValues(result);
          }
        },
        (error: any) => {
          this.openSnackBar(error.message, "Dismiss");
        })
  }

  getProduct(productId: string) {
    this.nameSearchIsLoading = true;
    this.productService.getProduct(productId).pipe(finalize(() => {
    }))
      .subscribe((result: Product) => {
          if (result != null) {
            this.initializeFormDataWithValues(result);
          }
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar(error.error.message, "Dismiss");
        })
  }

  private initializeFormDataWithValues(product: Product) {


    this.createProductFormGroup = new FormGroup({
      productName: new FormControl(product.name, [Validators.required]),
      description: new FormControl(product.description),
      barCode: new FormControl(product.barCode, [Validators.required]),
      price: new FormControl(product.price, [Validators.required, Validators.pattern('^[0-9]*$')]),
      quantity: new FormControl(product.quantity, [Validators.required]),
      categoryId: new FormControl(product.category.id, [Validators.required]),
      brand: new FormControl(product.brand, ),
      color: new FormControl(product.color),
      size: new FormControl(product.size),
    });
  }

  private initializeFormDataWithoutValues() {
      this.createProductFormGroup = new FormGroup({
        productName: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        barCode: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        quantity: new FormControl('', [Validators.required]),
        categoryId: new FormControl('', [Validators.required]),
        brand: new FormControl('', ),
        color: new FormControl(''),
        size: new FormControl(''),
      });

  }




}
