import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class SearchService {

  private baseUrl: string = 'https://api.twitch.tv/kraken/games/top';

  private products$ = new BehaviorSubject<Array<any>>([]);
  products = this.products$.asObservable();

  private total$ = new BehaviorSubject<number>(0);
  total = this.total$.asObservable();

  private filters$ = new BehaviorSubject<Object>({
    term: "",
    offset: 0,
    take: 10
  });
  filters = this.filters$.asObservable();

  updateFilters(filters:Object) {
    if(!filters['offset']) filters['offset'] = 0;
    if(!filters['take']) filters['take'] = 10;
    if(!filters['term']) filters['term'] = '';
    this.filters$.next(filters);
  }

  constructor(private http: HttpClient) {
    this.filters.debounceTime(400)
    .distinctUntilChanged()
    .subscribe(filter => {
      this.http.get(this.baseUrl + filter['take'] + '/' + filter['offset'] + '?s=' + filter['term'])
        .subscribe( response => {
          this.products$.next(response['products']);
          this.total$.next(response['total']);
        })
    });
  }

}
