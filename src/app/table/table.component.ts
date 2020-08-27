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
  btnClick = false;
  genders = ['М', 'Ж'];
  types = ['котяу', 'собакау', 'попугау'];

  MaxValue = (arr) => {
    let newArr = [];
    for (var key of arr) {
      newArr.push(key.id);
    }
    return Math.max(...newArr);
  };

  counter = this.MaxValue(mockData);

  constructor(private fb: FormBuilder) {}

  initForm() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['М', [Validators.required]],
      type: ['котяу', [Validators.required]],
      color: ['', [Validators.required]],
      vaccination: ['', [Validators.required]],
    });
  }

  get name() {
    return this.profileForm.get('name');
  }

  get color() {
    return this.profileForm.get('color');
  }

  get vaccination() {
    return this.profileForm.get('vaccination');
  }

  get type() {
    return this.profileForm.get('type');
  }

  get gender() {
    return this.profileForm.get('gender');
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.initForm();
  }

  addPet() {
    this.pet = this.profileForm.value;
    this.pet.id = ++this.counter;
    this.pets.push(this.pet);
  }

  add2Pet(id) {
    console.log(111);
    let start = this.pets.findIndex((pet) => pet.id === id);
    let toRemove = 1;
    let newArr = this.pets.splice(start, toRemove, ...this.pets);
    this.pets = newArr;
    console.log(this.pets);
  }

  deletePet(id) {
    this.pets.splice(
      this.pets.findIndex((pet) => pet.id === id),
      1
    );
  }

  editPet(id) {
    let obj = this.pets.find((pet) => pet.id === id);
    this.profileForm.patchValue(obj);
  }
}
