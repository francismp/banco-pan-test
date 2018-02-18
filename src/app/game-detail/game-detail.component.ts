import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { GamesService } from '../services/games.service';
import { StreamService } from '../services/streams.service';

@Component({
  selector: 'game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  public game: any;
  public streamers: any;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GamesService,
    private streamService: StreamService
  ) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.gameService.games.subscribe(games => {
        if (!games.length) this.goHome();

        this.game = games.find(g => g['id'] === parseInt(params['id']));

        this.streamService.getStreamsByGame(this.game.name).subscribe(streamers =>
          this.streamers = streamers
        );
      })
    })
  }

  goHome () {
    this.router.navigateByUrl('/');
  }
}
