import { Component, Input } from '@angular/core';

@Component({
  selector: 'game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameListItemComponent {

  @Input() game: any;

}
