import { Component, OnInit } from '@angular/core';
import mockData from './pets.mock';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  pet: any = {};
  pets = mockData;
  profileForm: FormGroup;
  btn = 'Создать';
  head = 'Новый питомец';
  btnClick = false;

  constructor(private fb: FormBuilder) {}

  initForm() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get elFirstName() {
    return this.profileForm.get('firstName');
  }

  ngOnInit(): void {
    this.initForm();
  }
}
