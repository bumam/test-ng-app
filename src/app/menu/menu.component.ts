import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {I} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})


export class MenuComponent implements OnInit {
  active = false;

  @Input() users = ['blue'];

  @Output() dataP: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

}
  edit(): void{
    this.dataP.emit('hhh');
  }
}
