import {
  Component,
  OnInit,
  OnDestroy,
  VERSION
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { DataService } from '../core/data.service';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';
import { Reader } from '../models/reader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  private isComponentActive = true;

  constructor(private dataService: DataService,
              private title: Title,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.error(resolvedData.friendlyMessage);
    } else {
      this.allBooks = resolvedData;
    }

    this.dataService.getAllReaders()
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        data => this.allReaders = data,
        error => console.error(error),
        () => console.log('Finished retrieving readers'));

    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${ VERSION.full }`);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  deleteBook(bookId: number): void {
    this.dataService.deleteBook(bookId)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        () => {
          const index: number = this.allBooks.findIndex(book => book.bookID === bookId);
          this.allBooks.splice(index, 1);
        },
        error => console.error(error)
      );
  }

  deleteReader(readerId: number): void {
    this.dataService.deleteReader(readerId)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        () => console.log(`Reader ${ readerId } has been deleted!`),
        error => console.error(error)
      );
  }
}
