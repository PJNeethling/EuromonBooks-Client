import { DecimalPipe } from "@angular/common";
import BookResponse from './book-response';

export default interface Books {
    totalItems: number;
    books: BookResponse[];
}