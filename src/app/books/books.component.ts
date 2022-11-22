import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import BookResponse from '../responses/book-response';
import Books from '../responses/books-response';
import { Router } from '@angular/router';
import { ErrorResponseDetails } from '../responses/error-response';
import { Error } from '../responses/error-response';
import { ErrorItemResponse } from '../responses/error-item-response';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookItem: BookResponse[] = [{
      id: 0,
      name: '',
      description: '',
      purchasePrice: 0,
      text: '',
      isActive: true
  }];

  booksObject: Books = {
    totalItems: 0,
    books: this.bookItem
  };

  errorItem: ErrorItemResponse[] = [{
    message: ''
  }];

  errorDetails: ErrorResponseDetails = { 
    message: '', 
    code: 0,
    errors: this.errorItem
  };

  error: Error = { 
    error: this.errorDetails
  };

  loading: boolean = false;
  bookPurchasedFailed: boolean = false;
  booksExists: boolean = false;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      {
        next: (data => {
          this.booksObject = data;
          this.booksExists = true;
        }),
        error: (() => {
          console.log('failed to get the list of books');
        })
      }

    );
  }

  purchaseBook(book: BookResponse): void {
    this.loading = true;
    this.bookService.purchaseBook(book).subscribe(
      {
        next: (() => {
          this.loading = false;
          this.router.navigate(['subscriptions']);
        }),
        error: ((error) => {
          this.loading = false;
          console.log('failed to get the list of books');
          this.error = error;
          this.bookPurchasedFailed = true;
        })
      }
      );
  }

}
