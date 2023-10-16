import { Price } from "./price"

export interface Book {
    ISBN: number,
    title: string,
    author: string,
    summary: string,
    image: string,
    price: Price,
    quantity? : number ;
}