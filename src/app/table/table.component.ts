import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import mockData from './pets.mock';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
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
  btnClick = false;
  selectedName;
  selectedPet: IPet;
  newPet = false;
  openedRightSide = false;
  petId;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getId(value) {
    this.petId = value;
  }

  newBtn(state) {
    this.btnClick = state;
  }

  maxValue(arr) {
    const newArr = [];
    for (const key of arr) {
      newArr.push(key.id);
    }
    return Math.max(...newArr);
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

  deletePet(id): void {
    this.pets.splice(
      this.pets.findIndex((pet) => pet.id === id),
      1
    );
  }
}
