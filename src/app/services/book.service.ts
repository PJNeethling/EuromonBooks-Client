import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import BookResponse from '../responses/book-response';
import Books from '../responses/books-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Books> {
    return this.httpClient.get<Books>(`${environment.apiUrl}/v1/books`);
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