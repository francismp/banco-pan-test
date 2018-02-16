import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { GameStore } from "../store/game-store";

@Component({
  selector: 'game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  public game: any;

  constructor(private store: GameStore) {}
  
  ngOnInit() {
    this.store.getGame().subscribe(data => this.game = data)
  }
}
