import {CartItem, Product} from "./product";

export interface Invoice{
  cartItems:CartItem[];
  cashier:string;
  subTotal:number;
  discount:number;
  taxTotal:number;
  total:number;
}
