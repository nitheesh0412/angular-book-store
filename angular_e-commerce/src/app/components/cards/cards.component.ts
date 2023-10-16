import { Component, Input, Output,EventEmitter } from '@angular/core';

import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})


export class CardsComponent {
  @Input() bookDetails: Book;

  constructor() {
    this.bookDetails = {
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

  @Output() addProduct: EventEmitter<Book> = new EventEmitter();

  addToCart(bookDetails:Book) {
    this.addProduct.emit(bookDetails);
  }

  @Output() addOneBook : EventEmitter<Book> = new EventEmitter()

  @Output() delOneBook : EventEmitter<Book> = new EventEmitter()


  addOneProduct(e:Book){
    this.addOneBook.emit(e);
  }

  delOneProduct(e:Book){
    this.delOneBook.emit(e)
  }
}
