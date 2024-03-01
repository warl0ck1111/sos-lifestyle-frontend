import {Product} from "./product";

export interface Sale {
    id: number,
    product: Product,
    price: number,
    cashier:string,
    invoiceNo:number
    quantity: number,
    totalPrice: number,

}

export interface SalesRequest{
  items:SaleDetail[];
}



export interface SaleDetail {
  productId:number;
  barCodeNumber:string;
  quantity:number;
}
