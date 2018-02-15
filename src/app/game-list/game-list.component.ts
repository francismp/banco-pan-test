import { Component, OnInit } from '@angular/core';
import { GameListPaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
