import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class GameStore {

  public game: Subject<any> = new Subject<any>();

  constructor() {}

  getGame(): Observable<any> {
    return this.game.asObservable()
  }

  setGame(game) {
    this.game.next(game)
  }
}