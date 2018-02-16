import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { AppComponent } from './app.component';

import { GameListComponent } from './game-list/game-list.component';
import { GameListPaginationComponent } from './game-list/pagination/pagination.component';
import { GameListItemComponent } from "./game-list/game-item/game-item.component";
import { GameDetailComponent } from './game-detail/game-detail.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './game-list/filter/filter.component';
import { SearchInputComponent } from './header/search-input/search-input.component';
import { FormsModule } from '@angular/forms';

import { SearchService } from './search.service';

import { SearchPipe } from "./pipes/search.pipe";


@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameListPaginationComponent,
    GameListItemComponent,
    GameDetailComponent,
    HeaderComponent,
    SearchInputComponent,
    FilterComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ SearchService, Subject ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
