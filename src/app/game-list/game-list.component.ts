import { Component, OnInit } from '@angular/core';
import { GameListPaginationComponent } from './pagination/pagination.component';
import { SearchService } from '../search.service';
import { Observable, Subject } from 'rxjs';
import { Game } from "../models/game";
import { FormControl } from "@angular/forms"

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  private offset: number = 0;
  private limit: number = 100;
  private games: Observable<object>;

  constructor(public service:SearchService) { }

  ngOnInit() {
    this.games = this.service.getTopGames(this.offset, this.limit)
  }

}
