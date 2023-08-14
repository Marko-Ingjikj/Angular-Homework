import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagmentComponent } from './components/hotel-managment/hotel-managment.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
