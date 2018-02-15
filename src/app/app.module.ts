import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { GameListComponent } from './game-list/game-list.component';
import { GameListPaginationComponent } from './game-list/pagination/pagination.component';
import { GameListItemComponent } from "./game-list/game-item/game-item.component";
import { GameDetailComponent } from './game-detail/game-detail.component';
import { HeaderComponent } from './header/header.component';
import { SearchInputComponent } from './header/search-input/search-input.component';

import { SearchService } from './search.service';


@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameListPaginationComponent,
    GameListItemComponent,
    GameDetailComponent,
    HeaderComponent,
    SearchInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
