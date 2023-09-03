import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/hotels/hotels.reducers';
import { HotelsEffects } from './store/hotels/hotels.effects';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/enivornment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HotelService } from './services/hotel.service';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('hotels', reducer),
    EffectsModule.forFeature([HotelsEffects]),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [HotelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
