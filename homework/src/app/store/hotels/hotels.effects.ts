import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addHotel,
  addHotelFailure,
  addHotelSuccess,
  deleteHotel,
  deleteHotelFailure,
  deleteHotelSuccess,
  getHotels,
  getHotelsFailure,
  getHotelsSuccess,
} from './hotels.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel.interface';

@Injectable()
export class HotelsEffects {
  constructor(private actions$: Actions, private hotelService: HotelService) {}

  getHotels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getHotels),
      switchMap(() =>
        this.hotelService.getAllHotels().pipe(
          map(
            (hotels) => getHotelsSuccess({ hotels }),
            catchError((error) =>
              of(
                getHotelsFailure({
                  error: error.message || 'Error while getting hotels',
                })
              )
            )
          )
        )
      )
    )
  );

  addHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHotel),
      switchMap(({ hotel }: { hotel: Hotel }) =>
        this.hotelService.addNewHotel(hotel)
      ),
      map(() => addHotelSuccess()),
      catchError((error) =>
        of(
          addHotelFailure({
            error: error.message || 'Error while adding hotel',
          })
        )
      )
    )
  );

  deleteHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHotel),
      switchMap(({ id }: { id: string }) => this.hotelService.deleteHotel(id)),
      map(() => deleteHotelSuccess()),
      catchError((error) =>
        of(
          deleteHotelFailure({
            error: error.message || 'Error while deleting hotel',
          })
        )
      )
    )
  );
}
