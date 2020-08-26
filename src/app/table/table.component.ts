import { Component, OnInit } from '@angular/core';
import mockData from './pets.mock';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  pet: any = {};
  pets = mockData;

  constructor() {}

  ngOnInit(): void {}
}
