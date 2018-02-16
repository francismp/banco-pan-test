import { Component, OnInit } from '@angular/core';
import { GameListPaginationComponent } from './pagination/pagination.component';
import { SearchService } from '../search.service';
import { Observable, Subject } from 'rxjs';
import { Game } from "../models/game";

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  private offset: number;
  private limit: number;
  private games: Observable<object>;

  constructor(public service:SearchService) { 
    this.offset = 0;
    this.limit = 10;
   }

  ngOnInit() {
    this.games = this.service.getTopGames(this.offset, this.limit)
  }

}
