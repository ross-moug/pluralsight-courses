import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../models/book';
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private loggerService: LoggerService) { }

  ngOnInit() {
    const bookID: number = parseInt(this.route.snapshot.params['id']);
    this.selectedBook = this.dataService.getBookById(bookID);
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
    this.loggerService.log(`New most popular book: ${this.selectedBook.title}`);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}