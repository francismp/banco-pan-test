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

  private baseUrl: string = 'https://api.twitch.tv/kraken/';

  private games$ = new BehaviorSubject<Game[]>([]);
  games = this.games$.asObservable();

  private total$ = new BehaviorSubject<number>(0);
  total = this.total$.asObservable();

  constructor(private http: HttpClient) {}

  getTopGames(limit: number, offset: number): Observable<Game[]> {
    let params = new HttpParams({ fromObject: { limit: limit.toString(), offset: offset.toString() } });

    return this.get('games/top', params).map(
        res => {
          this.clearGamesList()
          let data = res['top'].map(this.format)
          this.games$.next(this.games$.getValue().concat(data));
          return data
        },
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
      );
  }

  getGamesByTerm(term:string) {
    let params = new HttpParams({ fromObject: { query: term, type: 'suggest' } });
    return this.get('search/games', params).map(
        res => {
          this.clearGamesList()
          let data = res['games'].map(this.format)
          this.games$.next(this.games$.getValue().concat(data));
          return data
        },
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
      );
  }

  clearGamesList() {
    this.games$.next([])
  }

  private get(path:string, params: HttpParams) {
    return this.http.get(this.baseUrl+path, {
      'headers': { 'Client-ID': environment.twitchClientId },
      'params': params
    });
  }

  private format(game) {
    if (!game.game) game = { game };

    game = {
      id: game.game._id,
      name: game.game.name,
      channels: game.channels,
      viewers: game.viewers,
      popularity: game.game.popularity,
      image: game.game.box.large
    };

    return game;
  }

}
