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
export class SubscriptionService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getSubscriptionBooks(): Observable<Books> {
    let session = this.tokenService.getSession();
    return this.httpClient.get<Books>(`${environment.apiUrl}/v1/user/${session?.uUid}/books`);
  }

  // saveTask(task: TaskResponse): Observable<TaskResponse> {
  //   return this.httpClient.post<TaskResponse>(`${environment.apiUrl}/tasks`, task);
  // }

  // updateTask(task: TaskResponse): Observable<TaskResponse> {
  //   return this.httpClient.put<TaskResponse>(`${environment.apiUrl}/tasks`, task);
  // }

  // deleteTask(taskId: number) {
  //   return this.httpClient.delete<TaskResponse>(`${environment.apiUrl}/tasks/${taskId}`);
  // }
  
}