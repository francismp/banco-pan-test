import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Game } from '../models/game'

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, AfterViewInit, OnDestroy {

  private offset: number = 0;
  private limit: number = 100;
  public games: Game[] = [];
  public loading: boolean = true;
  public query: string = '';
  public searching: boolean = false;

  constructor(public service:GamesService, private router: Router) {
    let width = window.innerWidth;

    if (width <= 480) {
      this.limit = 25;
    } else if (width <= 1024) {
      this.limit = 50;
    }
  }

  ngOnInit() {
    this.service.games.subscribe(games => this.games = games)

    if (!this.games.length) this.topGames();
    else this.loading = false;
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    let offsetHeight = document.body.offsetHeight - window.innerHeight;

    if ((window.pageYOffset / offsetHeight) > 0.9 && !this.loading && !this.searching) {
        this.loading = true;
        this.offset = this.games.length;
        this.topGames();
    }
  }

  topGames() {
    this.service.getTopGames(this.limit, this.offset).subscribe(games => {
      this.games.concat(games);
      this.loading = false;
    })
  }

  search(term) {
    this.loading = true;
    this.searching = true;

    if(!term) {
      this.searching = false;
      this.service.clearGamesList();
      return this.topGames();
    }
    
    this.service.getGamesByTerm(term).subscribe(games => {
      this.games = games;
      this.loading = false;
    })
  }

  sortBy(option: string) {
    if (!this.games) return false;

    this.games = this.games.sort((a, b) => b[option] - a[option]);
  }
}
