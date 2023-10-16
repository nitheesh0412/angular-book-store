import { Component, OnInit } from '@angular/core';
import { BooksService } from './services/books.service';

import { Book } from './models/book';
import { BooksData } from './models/books-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  booksList!: BooksData;
  cartItems: Array<Book> = []
  total: number = 0.00
  filteredBooksList: Array<Book> = [];
  private _filter: string = "";
  constructor(private _booksService: BooksService) {

  }

  set filter(filter: string) {
    this._filter = filter;
    this.filteredBooksList = this.booksList.books.filter(item => item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    // console.log(this.filteredBooksList.length);
  }

  ngOnInit(): void {
    this.booksList = this._booksService.getBookData();

    this.filteredBooksList = this.booksList.books;
  }

  insertProduct(e: Book) {
    console.log(e)

    let itemIndex = this.cartItems.findIndex(obj => obj.ISBN === e.ISBN)

    if (itemIndex === -1) {
      this.cartItems.push(e)
      e.quantity = 1;
    }
    else {
      e.quantity = e.quantity! + 1;
    }

    this.total = Math.floor((this.total + e.price.value) * 1000) / 1000;
  }

  removeItem(ISBN: number) {


    let itemIndex = this.cartItems.findIndex(obj => obj.ISBN === ISBN)

    this.total = Math.floor((this.total - (this.cartItems[itemIndex].price.value) * this.cartItems[itemIndex].quantity!) * 1000) / 1000

    this.cartItems[itemIndex].quantity! -= 1;
    this.cartItems.splice(itemIndex, 1);

  }

  removeBook(e: Book) {
    let itemIndex = this.cartItems.findIndex(obj => obj.ISBN === e.ISBN)

    if (this.cartItems[itemIndex].quantity === 1) {
      this.total = Math.floor((this.total - (this.cartItems[itemIndex].price.value) * this.cartItems[itemIndex].quantity!) * 1000) / 1000
      this.cartItems[itemIndex].quantity! -= 1;
      this.cartItems.splice(itemIndex, 1)
    }
    else {
      this.cartItems[itemIndex].quantity! -= 1;
      this.total = this.total - this.cartItems[itemIndex].price.value;
    }
  }

  // filterResults(text : string){
  //   if(!text){
  //     this.filteredBooksList=this.booksList.books;
  //   }

  //   this.filteredBooksList = this.booksList.books.filter(
  //     book => book.title.toLowerCase().includes(text.toLowerCase())
  //   )
  // }

}
