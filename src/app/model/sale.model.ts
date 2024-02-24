import { SaleDetail } from './sale-detail.model';
import {Product} from "./product";

export interface Sale {
    id: number,
    product: Product,
    price: number,
    quantity: number,
    totalPrice: number,
    date: Date
}
