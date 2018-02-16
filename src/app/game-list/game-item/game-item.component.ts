import { Component, OnInit, Input } from '@angular/core';
import { Game } from "../../models/game";
import { GameStore } from "../../store/game-store";
import { Router } from '@angular/router';

@Component({
  selector: 'game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameListItemComponent implements OnInit {

  @Input() game: any;

  constructor(
    private store: GameStore,
    private router: Router
  ) { }

  ngOnInit() { }

  selectGame() {
    this.store.setGame(this.game);
    this.router.navigate([`/game/${this.game.id}`]);
  }
}
