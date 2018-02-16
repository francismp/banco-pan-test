import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  private offset: number = 0;
  private limit: number = 100;
  private games: Observable<object>;

  constructor(
    public service:SearchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.games = this.service.getTopGames(this.offset, this.limit)
  }

  sortBy(option: string) {
    if (option == 'popularity') {
      this.games = this.games.map(games => games.sort((a, b) => b.popularity > a.popularity))
    } else if (option == 'viewers') {
      this.games = this.games.map(games => games.sort((a, b) => b.viewers > a.viewers))
    }
  }
}
