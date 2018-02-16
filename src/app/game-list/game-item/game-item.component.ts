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

  @Input() game: object;

  constructor(
    private store:GameStore,
    private router: Router
  ) {
    this.store.game.next('')
  }

  ngOnInit() { }

  selectGame() {
    this.store.game.next(this.game);
    this.router.navigate([`/game/${this.game.id}`]);
  }
}
