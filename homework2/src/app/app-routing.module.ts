import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagmentComponent } from './components/hotel-managment/hotel-managment.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';
import { RoomFormComponent } from './components/room-form/room-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hotel-managment',
    pathMatch: 'full',
  },
  {
    path: 'hotel-managment',
    component: HotelManagmentComponent,
  },
  {
    path: 'hotel-details/:id',
    component: HotelDetailsComponent,
  },
  {
    path: 'hotel-form',
    component: HotelFormComponent,
  },
  {
    path: 'hotel-form/:id',
    component: HotelFormComponent,
  },
  {
    path: 'room-form/:id',
    component: RoomFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
