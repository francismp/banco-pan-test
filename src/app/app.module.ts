import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { AppComponent } from './app.component';

import { GameListComponent } from './game-list/game-list.component';
import { GameListItemComponent } from './game-list/game-item/game-item.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { StreamerComponent } from './game-detail/streamer/streamer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './game-list/loader/loader.component';
import { FormsModule } from '@angular/forms';

import { GamesService } from './services/games.service';
import { StreamService } from './services/streams.service';

import { SearchPipe } from './pipes/search.pipe';


const appRoutes: Routes = [
  {
    path: 'game/:id',
    component: GameDetailComponent
  },
  {
    path: '',
    component: GameListComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameListItemComponent,
    GameDetailComponent,
    StreamerComponent,
    HeaderComponent,
    LoaderComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GamesService, StreamService, Subject ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
