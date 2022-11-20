import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import BookResponse from '../responses/book-response';
import Books from '../responses/books-response';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getBooks(): Observable<Books> {
    return this.httpClient.get<Books>(`${environment.apiUrl}/v1/books`);
  }

  purchaseBook(book: BookResponse): Observable<BookResponse> {
    let session = this.tokenService.getSession();
    return this.httpClient.post<BookResponse>(`${environment.apiUrl}/v1/user/${session?.uUid}/book/${book.id}`, book);
  }  
}