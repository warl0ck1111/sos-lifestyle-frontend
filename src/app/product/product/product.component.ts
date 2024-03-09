import {Component, HostListener, Inject, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CartItem, Product, ProductRequest} from "../../model/product";
import {SalesService} from "../../services/sales.service";
import {BehaviorSubject, catchError, finalize, of, Subject, switchMap, timer} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Invoice} from "../../model/invoice";
import {ProductsService} from "../../services/products.service";
import {SaleDetail, SalesRequest} from "../../model/sale";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CategoryService} from "../../services/category.service";
import {ColorService} from "../../services/color.service";
import {BrandService} from "../../services/brand.service";
import {Category} from "../../model/category";
import {HttpErrorResponse} from "../../model/http-response";
import {Color} from "../../model/color";
import {Sizes} from "../../model/size";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {CredentialsService} from "../../services/credentials.service";
import {MatIconModule} from "@angular/material/icon";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


declare function PrintReceipt(invoice: Invoice, inches: number): string; // Declare the external function
declare function getPosData(): string; // Declare the external function
declare function checkPrinterStatus(): any; // Declare the external function

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent {


  userIsLoggedIn!: boolean;
  count: number = 0;

  cart: CartItem[] = [];
  products!: Product[];

  displayedProductListColumns: string[] = ['position', 'name', 'description', 'quantity', 'price', 'action'];
  displayedCartListColumns: string[] = ['position', 'name', 'quantity', 'action'];
  productListDataSource = new MatTableDataSource<Product>();
  cartListDataSource = new MatTableDataSource<CartItem>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) productListPaginator!: MatPaginator;
  @ViewChild(MatPaginator) cartListPaginator!: MatPaginator;
  barcodeValue: string = '';


  constructor(
    public dialog: MatDialog,
    private productService: ProductsService,
    private saleService: SalesService,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private credentialService: CredentialsService
  ) {

    console.log("ProductComponent/constructor/getPosData()" + getPosData());
    console.log("ProductComponent/constructor/checkPrinterStatus()" + checkPrinterStatus())
    this.userIsLoggedIn = credentialService.isAuthenticated();
    console.log("ProductComponent/constructor/userIsLoggedIn" + this.userIsLoggedIn)
  }


  ngOnInit() {
    this.getProducts()
  }

  ngAfterViewInit() {
    console.log("still reached here...")
    this.productListDataSource.sort = this.sort;
    this.productListDataSource.paginator = this.productListPaginator;
    this.cartListDataSource.paginator = this.cartListPaginator;
  }

  getCartIndex(element: CartItem): number {
    // If not using pagination
    // return this.dataSource.data.indexOf(element);

    // If using pagination
    const pageIndex = this.cartListPaginator.pageIndex;
    const pageSize = this.cartListPaginator.pageSize;
    return pageIndex * pageSize + this.cartListDataSource.data.indexOf(element) + 1;
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log("handleKeyboardEvent/event.key:" + event.key)
    if (event.key === 'Enter') {
      // Process the scanned barcode value
      console.log('Scanned barcode:', this.barcodeValue);
      this.applyProductListFilter(event);//todo confirm
      // Clear the barcode value for the next scan
    }
  }

  applyProductListFilter(event?: Event) {
    if (!event) return
    const filterValue = (event.target as HTMLInputElement).value;
    this.productListDataSource.filter = filterValue.trim().toLowerCase();

    if (this.productListDataSource.paginator) {

      this.productListDataSource.paginator.firstPage();
    }
  }

  openDialog(product?: Product): void {
    const dialogRef = this.dialog.open(CreateUpdateProductDialog, {
      data: {product: product},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;

      this.refreshProductList()
      this.getProducts();
    });
  }


  addToCart(product: Product) {
    // console.log("addToCart/product:" + JSON.stringify(product))

    let cartItem: CartItem = this.buildCartItem(product);

    console.log("addToCart/cartItem: " + JSON.stringify(cartItem))
    const productExists: boolean = this.cart.some(item => item.barCode === product.barCode);


    if (productExists) {
      console.log("addToCart/product already exists");

      const cartItemIndex: number = this.cart.findIndex(cartItem => cartItem.barCode === product.barCode);

// Check if the product exists in the array
      if (cartItemIndex !== -1) {
        // Modify the properties of the product at the found index
        this.cart[cartItemIndex].quantity += 1;


        //subtract from product count
        this.products.forEach((productValue: Product, index: number, obj: any) => {
          if (productValue.barCode === product.barCode) {
            productValue.quantity -= 1;
          }
        })
        // this.productListDataSource.data = this.products;
        this.cartListDataSource.data = this.cart;


      } else {
        console.log('Product not found');
      }


      let quantity = cartItem.quantity + 1;
      this.cart.forEach((value: CartItem, index: number, obj: any) => {
        if (value === cartItem) {
          value.quantity += 1;
        }
      })
      this.cartListDataSource.data = this.cart;
      console.log("cart.size:" + this.cart.length)
      console.log("cartListDataSource.data.size:" + this.cartListDataSource.data.length)
    } else {
      console.log("productDoesNotExist...")
      cartItem.quantity = 1;
      this.cart.push(cartItem);
      this.cartListDataSource.data = this.cart;
//subtract from product count
      this.products.forEach((productValue: Product, index: number, obj: any) => {
        if (productValue.barCode === product.barCode) {
          productValue.quantity -= 1;
        }
      })
    }


  }


  buildCartItem(product: Product): CartItem {
    let cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      description: product.description,
      barCode: product.barCode,
      price: product.price,
      quantityInStock: product.quantity, // quantityInStock is the same as quantity in the Product model
      quantity: 0, // Set initial quantity to 0
      categoryId: product.category.id,
      brand: product.brand,
      color: product.color,
      size: product.size,

    };
    return cartItem;
  }

  removeFromCart(cartItem: CartItem) {
    console.log("removeFromCart/cartItem:" + JSON.stringify(cartItem))

    //add to cartItem count
    this.products.forEach((productValue: Product, index: number, obj: any) => {
      if (productValue.barCode === cartItem.barCode) {
        //reset total amount of product
        productValue.quantity += cartItem.quantity;
      }
    })

    this.cart.splice(this.cart.indexOf(cartItem), 1);
    this.cartListDataSource.data = this.cart;

  }


  postItemsForSale() {

    if (this.printerIsAvailable()) {


      if (window.confirm("Are you sure you want to proceed")) {
        console.log("postItemsForSale/cart:" + JSON.stringify(this.cart))
        console.log("postItemsForSale/cart.size:" + this.cart.length)

        if (this.cart.length != 0) {
          this.postSales(this.cart);
        } else {

          console.log("postItemsForSale/cart is empty")
        }
      }
    } else {

      if (window.confirm("printer is unavailable, do you wish to proceed with sale?")) {
        console.log("postItemsForSale/cart:" + JSON.stringify(this.cart))
        console.log("postItemsForSale/cart.size:" + this.cart.length)

        if (this.cart.length != 0) {
          this.postSales(this.cart);
        } else {

          console.log("postItemsForSale/cart is empty")
        }
      }
    }
  }

  increaseQuantity(productItem: CartItem) {

    const productIndexInCart: number = this.cart.findIndex(cartItem => cartItem.barCode === productItem.barCode);

    // Modify the properties of the product at the found index
    this.cart[productIndexInCart].quantity += 1;
    this.cartListDataSource.data = this.cart;


    //subtract from product count
    this.products.forEach((productValue: Product, index: number, obj: any) => {
      if (productValue.barCode === productItem.barCode) {
        productValue.quantity -= 1;
      }
    })

    console.log("increaseQuantity/element:" + JSON.stringify(productItem))


  }

  decreaseQuantity(productItem: CartItem) {

    const productIndexInCart: number = this.cart.findIndex(cartItem => cartItem.barCode === productItem.barCode);

    if (this.cart[productIndexInCart].quantity == 1) { //if only one item quantity is left, remove the product from cart
      this.cart.splice(productIndexInCart, 1);
      this.cartListDataSource.data = this.cart;
    } else {
      // Modify the properties of the product at the found index
      this.cart[productIndexInCart].quantity -= 1;
      this.cartListDataSource.data = this.cart;
    }
    //add to product count
    this.products.forEach((productValue: Product, index: number, obj: any) => {
      if (productValue.barCode === productItem.barCode) {
        productValue.quantity += 1;
      }
    })

    console.log("decreaseQuantity/element:" + JSON.stringify(productItem))


  }

  getProducts(): void {
    this.productService.getProducts().pipe(finalize(() => {

    }))
      .subscribe((products: any) => {

          this.products = products;
          this.productListDataSource.data = products;
          console.log("getProducts/finished getting products successfully")

        },
        error => {
          console.log("getProducts/there was an error getting products")

        })
  }

  getPrinterData(): any {
    return JSON.parse(getPosData())
  }

  printerIsAvailable(): boolean {
    return this.getPrinterData().id != 0
  }

  val: BehaviorSubject<boolean> = new BehaviorSubject(false);

  listenToPrinter() {
    timer(3000)
      .subscribe(() => {
        this.val.next(true);
      });
    do {
      console.log("this.printerIsAvailable():" + this.printerIsAvailable())
      this.printerIsAvailable()

    } while (!this.val.value)
  }

// httpCheckPrinterStatus(){
//     console.log("checking webCheckPrinterStatus....")
//         this.httpClient.post(`http://127.0.0.1:18080/WebPrintSDK/printer1/checkStatus`, null).subscribe(result=>{
//             console.log("webCheckPrinterStatus"+JSON.stringify(result))
//         })
// }


  postSales(cartItems: CartItem[]) {

    let salesRequestFromCartItem = this.getSalesRequestFromCartItem();
    this.saleService.createSales(salesRequestFromCartItem).pipe(finalize(() => {

    })).subscribe((result: any) => {


        console.log("postSales/finished posting sales successfully")


        let invoice = this.buildInvoice(cartItems);
        PrintReceipt(invoice, 2) //todo chage hardcoded value

        this.initializeData();
      },
      error => {
        this.openSnackBar(error.message, 'Dismiss')
        console.log("getProducts/there was an error getting products")

      })
  }

  private getSalesRequestFromCartItem(): SalesRequest {
    var saleDetails: SaleDetail[] = []
    for (const cartItem of this.cart) {
      saleDetails.push(this.buildSalesDetailFromCartItem(cartItem))
    }
    return {
      items: saleDetails

    }
  }

  buildSalesDetailFromCartItem(cartItem: CartItem): SaleDetail {
    return {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      barCodeNumber: cartItem.barCode
    }
  }

  buildInvoice(cartItems: CartItem[]): Invoice {
    return {
      cashier: this.getCashierName(),
      cartItems: cartItems,
      discount: 0.0,
      subTotal: this.getSubTotalFromCartItems(),
      taxTotal: 0.0,
      total: this.getSubTotalFromCartItems()
    }

  }

  getDiscountAmount(): number {
    return 0.00
  }

  getSubTotalFromCartItems(): number {

    let subTotal = 0;
    for (const cartItem of this.cart) {
      subTotal += (cartItem.quantity * cartItem.price);
    }

    return subTotal;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  private initializeData() {
    this.cart = [];
  }

  refreshProductList() {
    this.getProducts();
  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getCashierName() {
    return this.credentialService.credentials?.firstName + " "+ this.credentialService.credentials?.lastName;
  }
}


export interface DialogData {
  animal: string;
  name: string;
  product: Product;
}


@Component({
  selector: 'create-update-product-dialog',
  templateUrl: 'create-update-product-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class CreateUpdateProductDialog {
  product!: Product;
  isUpdate!: boolean;

  constructor(private categoryService: CategoryService, private productService: ProductsService,
              private router: Router,
              public dialogRef: MatDialogRef<CreateUpdateProductDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private colorService: ColorService,
              private _snackBar: MatSnackBar) {


  }


  createProductFormGroup!: FormGroup;
  createUpdateButtonTitle: string = 'Create Product';
  private searchTerms = new Subject<string>();


  ngOnInit() {
    this.initializeFormDataWithoutValues()
    this.getCategories();
    this.getColors();

    if (this.data.product) {
      console.log("ngOnInit/data:" + JSON.stringify(this.data))

      this.createUpdateButtonTitle = "Update Product"
      this.isUpdate = true;
      this.initializeFormDataWithValues(this.data.product)

    } else {
      this.initializeFormDataWithoutValues()
    }

    this.searchTerms.pipe(
      // Add debounceTime if you want to delay the search by a certain time
      // debounceTime(300),
      switchMap((productName: string) =>
        this.productService.searchProductByName(productName).pipe(
          catchError(error => {
            // Handle errors here
            console.error('Error occurred during search:', error);
            return of(null); // Return an empty observable to continue the stream
          })
        )
      )
    ).subscribe((result: Product | null) => {
      if (result !== null) {
        this.initializeFormDataWithValues(result);
        this.openSnackBar("Product already exist, update it instead", "Dismiss");
      }
    });
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
  barcodeSearchIsLoading: boolean = false;
  barcodeValue: string = '';

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
    this._snackBar.open(message, action,);
  }

  createUpdateProduct() {
    if (this.isUpdate) {

      //if property doesnt match then do this
      // this.user.Name = this.userForm.get('name').value;
      let productRequest: ProductRequest = this.buildProductRequest();
      console.log("createProduct/productRequest:" + JSON.stringify(productRequest))
      this.productService.updateProduct(this.data.product.id, productRequest).pipe(finalize(() => {

      })).subscribe((result: any) => {
          this.openSnackBar("product successfully updated ", "Dismiss");
          // this.router.navigateByUrl("product") //todo test remove
        },
        (error: any) => {
          this.openSnackBar(error.message, "Dismiss");

        })
    } else {

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
    var productName = this.createProductFormGroup.get('productName')?.value;
    this.searchTerms.next(productName);
  }

  searchProductBarcode(event: Event) {
    let barcode = ''
    if (event) {
      barcode = (event.target as HTMLInputElement).value;
    } else {
      barcode = this.createProductFormGroup.get('barCode')?.value

    }
    // this.nameSearchIsLoading = true;

    this.productService.searchProductByBarCode(barcode).pipe(finalize(() => {
      this.barcodeSearchIsLoading = false;
    }))
      .subscribe((result: Product) => {
          if (result != null) {
            this.openSnackBar("product already exist, update instead", "Dismiss");

            this.initializeFormDataWithValues(result);
          }
        },
        (error: any) => {
          // this.openSnackBar(error.message, "Dismiss");
        })
  }

 generateBarcode() {

    this.productService.generateBarCode().pipe(finalize(() => {
      this.barcodeSearchIsLoading = false;
    }))
      .subscribe((result: any) => {
          if (result != null) {
            this.openSnackBar("new product barcode generated successfully", "Dismiss");
          }
        },
        (error: any) => {
          this.openSnackBar(error.message, "Dismiss");
        })
  }


  private initializeFormDataWithValues(product: Product) {

    console.log("initializeFormDataWithValues")
    this.createProductFormGroup = new FormGroup({
      productName: new FormControl(product.name, [Validators.required]),
      description: new FormControl(product.description),
      barCode: new FormControl(product.barCode, [Validators.required]),
      price: new FormControl(product.price, [Validators.required, Validators.pattern('^[0-9]*$')]),
      quantity: new FormControl(product.quantity, [Validators.required]),
      categoryId: new FormControl(product.category.id, [Validators.required]),
      brand: new FormControl(product.brand,),
      color: new FormControl(product.color),
      size: new FormControl(product.size),
    });
    this.createUpdateButtonTitle = "Update Product"
  }

  initializeFormDataWithoutValues() {
    this.createProductFormGroup = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      barCode: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      quantity: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      brand: new FormControl('',),
      color: new FormControl(''),
      size: new FormControl(''),
    });


  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Process the scanned barcode value
      console.log('Scanned barcode:', this.barcodeValue);
      this.searchProductBarcode(event);//todo confirm
      // Clear the barcode value for the next scan
      // this.barcodeValue = '';
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
