import {Category} from "./category";
import {Brand} from "./brand";
import {Sizes} from "./size";

export interface Product {

  id: number;
  name: string;
  description: string;
  barCode: string;
  price: number;
  quantity: number;
  category: Category;
  brand: Brand;
  color: string;
  size: string;
  timeCreated: string;
  timeUpdated: string;
}

export interface ProductRequest {

  name: string;
  description: string;
  barCode: string;
  price: number;
  quantity: number;
  categoryId: number;
  brandId: number;
  color: string;
  size: Sizes;

}

export interface CartItem {
  name: string;
  description: string;
  barCode: string;
  price: number;
  quantityInStock:number;
  quantity: number;
  categoryId: number;
  brandId: number;
  color: string;
  size: string;
}
