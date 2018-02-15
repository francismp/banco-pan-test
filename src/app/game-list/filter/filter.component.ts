import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../search.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filters;

  constructor(public service:SearchService) {
    this.service.filters.subscribe(filters => this.filters = filters);
  }

  ngOnInit() {
  }

}
