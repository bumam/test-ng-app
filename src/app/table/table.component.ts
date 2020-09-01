import {Component, OnInit} from '@angular/core';
import mockData from './pets.mock';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

interface IPet {
  id?: number;
  name?: string;
  gender?: string;
  type?: string;
  color?: string;
  vaccination?: boolean;
}

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
  selectedName;
  selectedPet: IPet;
  newPet = false;
  openedRightSide = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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
      vaccination: [''],
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.initForm();
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
  }
  deletePetConfirm(id): void {
    const petName = this.pets.find(pet => pet.id === id).name;
    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'myapp-dialog',
      data: { name: petName },
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      console.log(confirmresult);
      if (confirmresult){
        this.deletePet(id);
        console.log('Delete confirm is approved by user.');
      }
      else {
        console.log('Delete confirm is cancelled by user.');
      }
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
    this.openRightSide();
  }

  save(id): void {
    console.log(id)
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
      this.openRightSide();
    } else {
      this.addPet();
    }
  }

  openRightSide(): void {
    this.newPet = !this.newPet;
    this.openedRightSide = !this.openedRightSide;
  }

  deletePet(id) {
    this.pets.splice(
      this.pets.findIndex((pet) => pet.id === id),
      1
    );
  }

  editPet(id): void {
    this.selectedName = id;
    this.selectedPet = this.pets.find((pet) => pet.id === id);
    this.profileForm.patchValue(this.selectedPet);
  }

  success (text) {
    console.log(text);
  }
}
