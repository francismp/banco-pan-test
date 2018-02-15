import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../search.service';
import { Observable } from 'rxjs';
import 'rxjs/observable/merge';
import 'rxjs/add/operator/merge';


@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class GameListPaginationComponent implements OnInit {

  private filters;
  currentPage: number;
  totalPages = 0;
  range = 2;
  pages: Observable<number[]>;

  constructor(public service:SearchService) {
  }

  ngOnInit() {

    this.service.filters.subscribe(filters => this.filters = filters);

    this.service.filters.switchMap( filters => {
      return this.service.total.map(t => {
        return {...filters, total: t}
      })
    }).subscribe(response =>
      this.getPages(response['offset'], response['take'], response['total']
    ))

  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = Observable.range(-this.range, this.range * 2 + 1)
      .map(offset => this.currentPage + offset)
      .filter(page => this.isValidPageNumber(page, this.totalPages))
      .toArray();
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  cancelEvent(event) {
    event.preventDefault();
  }

  selectPage(page) {
    if(page===this.currentPage || !this.isValidPageNumber(page, this.totalPages)) return 0;
    let offset = parseInt(this.filters.take) * (page-1);

    this.service.updateFilters({...this.filters, offset: offset});
  }

  isLastPage() : boolean {
    return (this.currentPage == this.totalPages);
  }

  isFirstPage() : boolean {
    return (this.currentPage == 1);
  }

}
