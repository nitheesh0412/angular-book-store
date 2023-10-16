import { Component, Input, Output,EventEmitter} from '@angular/core';

import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() item : Book;
  constructor() {
    this.item = {
      ISBN: 0,
      title: "",
      author: "",
      summary: "",
      image: "",
      price: {
        currency: "",
        value: 0,
        displayValue: ""
      }
    }
  }

  @Output() removeFromCart : EventEmitter<number> = new EventEmitter()

  @Output() addOneBook : EventEmitter<Book> = new EventEmitter()

  @Output() delOneBook : EventEmitter<Book> = new EventEmitter()
  
  removeProduct(ISBN:number){
    this.removeFromCart.emit(ISBN)
  }

  addOneProduct(e:Book){
    this.addOneBook.emit(e);
  }

  delOneProduct(e:Book){
    this.delOneBook.emit(e)
  }
}
