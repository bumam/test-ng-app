import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent, TableComponent, ModalComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, AppRoutingModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
