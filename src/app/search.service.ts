import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { filter } from 'rxjs/operators/filter';
import { Game } from "./models/game";

@Injectable()
export class SearchService {

  private baseUrl: string = 'https://api.twitch.tv/kraken/games/top';

  private games$ = new BehaviorSubject<Array<any>>([]);
  games = this.games$.asObservable();

  private total$ = new BehaviorSubject<number>(0);
  total = this.total$.asObservable();

  private filters$ = new BehaviorSubject<Object>({
    term: "",
    offset: 0,
    limit: 10
  });
  filters = this.filters$.asObservable();

  updateFilters(filters:Object) {
    if(!filters['offset']) filters['offset'] = 0;
    if(!filters['limit']) filters['limit'] = 10;
    if(!filters['term']) filters['term'] = '';
    this.filters$.next(filters);
  }

  search(term: string): Observable<Game[]> {
    let params = new HttpParams();
    params.append('limit', filter['limit']);
    params.append('offset', filter['offset']);

    return this.http.get(this.baseUrl, {
        'headers': { 'Client-ID': environment.twitchClientId },
        'params': params
      }).map( res => {
          console.log(res['top'])
          return res['top'].map(item => new Game(item))
        },
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
      );
  }

  getTopGames(limit: number, offset: number): Observable<object> {
    let params = new HttpParams();
    params.append('limit', filter['limit']);
    params.append('offset', filter['offset']);

    return this.http.get(this.baseUrl, {
        'headers': { 'Client-ID': environment.twitchClientId },
        'params': params
      }).map( res => {
        console.log(res['top'])
        return res['top']
      },
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
      );
  }

  constructor(private http: HttpClient) {}
}
