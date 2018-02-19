import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class StreamService {

  private baseUrl: string = 'https://api.twitch.tv/kraken/';

  constructor(private http: HttpClient) {}

  getStreamsByGame(game: string): Observable<Object> {
    return this.get('streams', new HttpParams({ fromObject: { game: game, limit: '10' } })).map(
      res => res['streams'].map(this.format),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }

  private get(path:string, params: HttpParams) {
    return this.http.get(this.baseUrl+path, {
      'headers': { 'Client-ID': environment.twitchClientId },
      'params': params
    });
  }

  private format(stream) {
    return {
      id: stream._id,
      name: stream.channel.display_name,
      followers: stream.channel.followers,
      viewers: stream.viewers,
      details: stream.channel.status,
      image: stream.preview.large,
      url: stream.channel.url
    };
  }

}
