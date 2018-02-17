import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SearchService } from '../search.service';

@Component({
  selector: 'game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  public game: any;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private service: SearchService
  ) {}
    
  ngOnInit() {
    this.route.params.subscribe( params => {
      this.service.games.subscribe(games => {
        if (!games.length) this.goHome()

        this.game = games.find(g => g['id'] === parseInt(params['id']))
      })
    })
  }

  goHome () {
    this.router.navigateByUrl('/')
  }
}
