import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import BookResponse from '../responses/book-response';
import Books from '../responses/books-response';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  hasSubscriptions = false;

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

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionBooks().subscribe(
      {
        next: (data => {
          this.hasSubscriptions = this.checkSubscriptions(data);
          this.booksObject = data;
        }),
        error: (() => {
          console.log('failed to get the list of books');
        })
      }
    );
  }

  checkSubscriptions(data: Books): boolean {
    if (data.books.length > 0) {
      return true;
    }
    return false;
  }
}
