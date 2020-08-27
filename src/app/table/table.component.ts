import {Component, OnInit} from '@angular/core';
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
  counter;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.counter = this.maxValue(mockData);
    this.initForm();
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

  maxValue(arr) {
    const newArr = [];
    for (const key of arr) {
      newArr.push(key.id);
    }
    return Math.max(...newArr);
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['М', [Validators.required]],
      type: ['котяу', [Validators.required]],
      color: ['', [Validators.required]],
      vaccination: ['', [Validators.required]],
    });
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
