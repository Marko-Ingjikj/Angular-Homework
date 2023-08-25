import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagmentComponent } from './components/hotel-managment/hotel-managment.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    path: 'room-form/:hotel-id',
    component: RoomFormComponent,
  },
  {
    path: 'room-form/:hotel-id/:room-id',
    component: RoomFormComponent,
  },
  {
    path: 'not-found/:from',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
