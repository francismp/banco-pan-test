import { Component, Input } from '@angular/core';

@Component({
  selector: 'streamer',
  templateUrl: './streamer.component.html',
  styleUrls: ['./streamer.component.scss']
})
export class StreamerComponent {

  @Input() streamer: any;

}
