import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import mockData from '../table/pets.mock';

interface IPet {
  id?: number;
  name?: string;
  gender?: string;
  type?: string;
  color?: string;
  vaccination?: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  pet: any = {};
  pets = mockData;
  profileForm: FormGroup;
  btnClick = true;
  genders = ['М', 'Ж'];
  types = ['котяу', 'собакау', 'попугау'];
  counter;
  selectedName;
  selectedPet: IPet;
  newPet = false;

  @Input() idd: number;

  @Output() clickMe = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.counter = this.maxValue(mockData);
    this.initForm();
    this.idd ? this.editPet(this.idd) : '';
}

  get name(): AbstractControl {
    return this.profileForm.get('name');
  }

  get color(): AbstractControl {
    return this.profileForm.get('color');
  }

  get vaccination(): AbstractControl {
    return this.profileForm.get('vaccination');
  }

  get type(): AbstractControl {
    return this.profileForm.get('type');
  }

  get gender(): AbstractControl {
    return this.profileForm.get('gender');
  }

  maxValue(arr) {
    const newArr = [];
    for (const key of arr) {
      newArr.push(key.id);
    }
    return Math.max(...newArr);
  }

  changeBtn(value: boolean) {
    this.clickMe.emit(value);
  }

  clearForm() {
    const empty = {
      name: '',
      gender: 'М',
      type: 'котяу',
      color: '',
      vaccination: false,
    };
    this.profileForm.patchValue(empty);
    this.idd = null;
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['М', [Validators.required]],
      type: ['котяу', [Validators.required]],
      color: ['', [Validators.required]],
      vaccination: [''],
    });
  }

  addPet(): void {
    const id = ++this.counter;
    const pet = {
      id,
      name: this.profileForm.value.name,
      gender: this.profileForm.value.gender,
      type: this.profileForm.value.type,
      color: this.profileForm.value.color,
      vaccination: this.profileForm.value.vaccination,
    };
    this.pets.push(pet);
  }

  save(id): void {
    if (id) {
      const tempPet = {
        id,
        name: this.name.value,
        gender: this.gender.value,
        type: this.type.value,
        color: this.color.value,
        vaccination: this.vaccination.value,
      };
      const foundIndex = this.pets.findIndex(pet => pet.id === tempPet.id);
      this.pets[foundIndex] = tempPet;
      this.selectedPet = null;
      this.selectedName = null;

    } else {
      this.addPet();
    }
  }


  editPet(id): void {
    this.selectedName = id;
    this.selectedPet = this.pets.find((pet) => pet.id === id);
    this.profileForm.patchValue(this.selectedPet);
  }

}
