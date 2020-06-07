import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-play-tool-bar',
  templateUrl: './play-tool-bar.component.html',
  styleUrls: ['./play-tool-bar.component.scss']
})
export class PlayToolBarComponent implements OnInit {

  constructor() { }
  @Input() dotPosition = 45;
  ngOnInit(): void {
  }

}
