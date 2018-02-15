import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameListItemComponent implements OnInit {

  @Input() game: any;

  constructor() { console.log(this.game) }

  ngOnInit() {
  }

}
