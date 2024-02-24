import {Product} from "./product";

export interface SaleDetail {
    id: number,
    quantity: number,
    price: number,
    product: Product
}
