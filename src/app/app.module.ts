import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { AppComponent } from './app.component';

import { GameListComponent } from './game-list/game-list.component';
import { GameListItemComponent } from './game-list/game-item/game-item.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './game-list/filter/filter.component';
import { SearchInputComponent } from './header/search-input/search-input.component';
import { FormsModule } from '@angular/forms';

import { GameStore } from './store/game-store';
import { SearchService } from './search.service';

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
    HeaderComponent,
    SearchInputComponent,
    FilterComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ SearchService, Subject, GameStore ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
