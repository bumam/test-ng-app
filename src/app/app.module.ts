import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent, TableComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
