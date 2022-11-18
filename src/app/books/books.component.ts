import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import BookResponse from '../responses/book-response';
import Books from '../responses/books-response';

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
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    //this.books = this.bookService.getBooks();


    this.bookService.getBooks().subscribe(
      {
        next: (data => {
          this.booksObject = data;
        }),
        error: (() => {
          console.log('failed to get the list of books');
        })
      }

    );
  }

  // addTask(): void {
  //   if (!this.newTaskString){
  //     return;
  //   }
  //   let task: BookResponse = {
  //     id: 0,
  //     isCompleted: false,
  //     name: this.newTaskString,
  //     ts: new Date()
  //   };
  //   this.taskService.saveTask(task).subscribe(() => this.tasks$ = this.taskService.getTasks());
  // }

  // updateTask(task: TaskResponse) {
  //   console.log('inside updatetask');
  //   console.log(`task id is ${task.id}`);
  //   task.isCompleted = !task.isCompleted;
  //   this.taskService.updateTask(task).subscribe(() => {});

  // }

  // removeTask(task: TaskResponse) {
  //   console.log('inside removeTask');
  //   console.log(`task id is ${task.id}`);
  //   this.taskService.deleteTask(task.id).subscribe(() => this.tasks$ = this.taskService.getTasks());
  // }

}
