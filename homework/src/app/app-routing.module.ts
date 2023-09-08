import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagmentComponent } from './components/hotel-managment/hotel-managment.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'hotel-form/:id',
    component: HotelFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'room-form/:hotel-id',
    component: RoomFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'room-form/:hotel-id/:room-id',
    component: RoomFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
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
