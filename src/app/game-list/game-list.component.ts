import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Game } from '../models/game'

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  private offset: number = 0;
  private limit: number = 100;
  private games: Game[] = [];
  private loading: boolean = true;

  constructor(
    public service:SearchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.games.subscribe(games => this.games = games)

    if (!this.games.length) this.topGames()
  }

  topGames() {
    this.service.getTopGames(this.limit, this.offset).subscribe(games => {
      this.loading = false;
      this.games = games
    })
  }

  search(term) {
    if(!term) return this.topGames()
    
    this.loading = true;
    this.service.getGamesByTerm(term).subscribe(games => {
      this.loading = false;
      this.games = games;
    })
  }

  sortBy(option: string) {
    if (!this.games) return false

    this.games = this.games.sort((a, b) => b[option] - a[option])
  }
}
