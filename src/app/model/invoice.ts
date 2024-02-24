import {CartItem, Product} from "./product";

export interface Invoice{
  cartItems:CartItem[];
  subTotal:number;
  discount:number;
  taxTotal:number;
  total:number;
}
