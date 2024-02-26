import {Component, HostListener, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CartItem, Product} from "../../model/product";
import {SalesService} from "../../services/sales.service";
import {finalize} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Invoice} from "../../model/invoice";
import {ProductsService} from "../../services/products.service";
import {SaleDetail, SalesRequest} from "../../model/sale";
import {PRODUCTS} from "../products";
import {AuthService} from "../../services/auth.service";

declare function PrintReceipt(invoice:Invoice, inches:number ):string; // Declare the external function
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent {


  cart: CartItem[] = [];
  products: Product[] = PRODUCTS;

  displayedProductListColumns: string[] = ['position', 'name', 'description', 'quantity', 'price', 'action'];
  displayedCartListColumns: string[] = ['position', 'name', 'quantity', 'action'];
  productListDataSource = new MatTableDataSource<Product>();
  cartListDataSource = new MatTableDataSource<CartItem>();

  @ViewChild(MatPaginator) productListPaginator!: MatPaginator;
  @ViewChild(MatPaginator) cartListPaginator!: MatPaginator;
  barcodeValue: string='';

  ngAfterViewInit() {
    this.productListDataSource.paginator = this.productListPaginator;
    this.cartListDataSource.paginator = this.cartListPaginator;
  }




  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService,
              private saleService: SalesService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
   this.initializeData()
    console.log("constructor/products length:" + this.products.length);

    console.log("constructor/authService/getLoggedInUser:"+ authService.getLoggedInUser());
    console.log("constructor/authService/isUserLoggedIn$:"+ JSON.stringify(authService.isUserLoggedIn$));
    console.log("constructor/authService/isUserLoggedIn$:"+ JSON.stringify(authService.userAccessToken$));

  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Process the scanned barcode value
      console.log('Scanned barcode:', this.barcodeValue);
      this.applyProductListFilter(event);//todo confirm
      // Clear the barcode value for the next scan
      this.barcodeValue = '';
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
      console.log("cart.size:" + this.cart.length)

      console.log("cartListDataSource.data.size:" + this.cartListDataSource.data.length)
    }


  }


  buildCartItem(product: Product): CartItem {
    let cartItem: CartItem = {
      productId:product.id,
      name: product.name,
      description: product.description,
      barCode: product.barCode,
      price: product.price,
      quantityInStock: product.quantity, // quantityInStock is the same as quantity in the Product model
      quantity: 0, // Set initial quantity to 0
      categoryId: product.category.id,
      brandId: product.brand.id,
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
    if (window.confirm("Are you sure you want to proceed")) {
      console.log("postItemsForSale/cart:" + JSON.stringify(this.cart))
      console.log("postItemsForSale/cart.size:" + this.cart.length)

      if (this.cart.length != 0) {
        this.postSales(this.cart);
      } else {

        console.log("postItemsForSale/cart is empty")
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

    })).subscribe((products: any) => {
        this.products = PRODUCTS
        this.productListDataSource.data = PRODUCTS;
        console.log("getProducts/finished getting products successfully")
      },
      error => {
        console.log("getProducts/there was an error getting products")

      })
  }

  postSales(cartItems:CartItem[]) {
    let salesRequestFromCartItem = this.getSalesRequestFromCartItem();
    this.saleService.createSales(salesRequestFromCartItem).pipe(finalize(() => {

    })).subscribe((result: any) => {


        console.log("postSales/finished posting sales successfully")



        let invoice = this.buildInvoice(cartItems);
        PrintReceipt(invoice, 2) //todo chage hardcoded value

      this.initializeData();
      },
      error => {this.openSnackBar(error.message, 'Dismiss')
        console.log("getProducts/there was an error getting products")

      })
  }

  private getSalesRequestFromCartItem():SalesRequest {
    var saleDetails:SaleDetail[] = []
    for (const cartItem of this.cart) {
      saleDetails.push(this.buildSalesDetailFromCartItem(cartItem))
    }
    return{ items:saleDetails

    }
  }
  buildSalesDetailFromCartItem(cartItem:CartItem):SaleDetail{
    return{
      productId:cartItem.productId,
      quantity:cartItem.quantity,
      barCodeNumber: cartItem.barCode
    }
  }

  buildInvoice(cartItems: CartItem[]):Invoice {
    return {
      cartItems:cartItems,
      discount:0.0,
      subTotal:this.getSubTotalFromCartItems(),
      taxTotal:0.0,
      total:this.getSubTotalFromCartItems()
    }

  }

  getDiscountAmount():number{
    return 0.00
  }
  getSubTotalFromCartItems():number{

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
    // this.getProducts();
    this.products = PRODUCTS
    this.productListDataSource.data = PRODUCTS;
    this.cart = [];
  }

  goToCreateProduct() {
    this.router.navigateByUrl("product/create")
  }
}
