import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelManagmentComponent } from './components/hotel-managment/hotel-managment.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { NavComponent } from './components/nav/nav.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelManagmentComponent,
    HotelDetailsComponent,
    NavComponent,
    HotelFormComponent,
    RoomFormComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
