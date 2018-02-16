import { Component, OnInit, Input } from '@angular/core';
import { Game } from "../../models/game";

@Component({
  selector: 'game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameListItemComponent implements OnInit {

  @Input() game: object;

  constructor() { }

  ngOnInit() { }

}
