import { Room } from './../../interfaces/room-interface';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addHotel,
  addHotelFailure,
  addHotelSuccess,
  addRoom,
  addRoomSuccess,
  deleteHotel,
  deleteHotelFailure,
  deleteHotelSuccess,
  deleteRoom,
  deleteRoomFailure,
  deleteRoomSuccess,
  getFilteredHotels,
  getFilteredHotelsFailure,
  getFilteredHotelsSuccess,
  getHotels,
  getHotelsFailure,
  getHotelsSuccess,
  updateHotel,
  updateHotelFailure,
  updateHotelSuccess,
  updateRoom,
} from './hotels.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { SearchFilters } from 'src/app/interfaces/search-filters.interface';

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

  getFilteredHotels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilteredHotels),
      mergeMap(({ filters }: { filters: SearchFilters }) => {
        return this.hotelService.searchHotels(filters).pipe(
          map((hotels) => getFilteredHotelsSuccess({ hotels })),
          catchError((error) =>
            of(
              getFilteredHotelsFailure({
                error: error.message || 'Error while getting hotels',
              })
            )
          )
        );
      })
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

  updateHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHotel),
      switchMap(({ hotel }: { hotel: Hotel }) =>
        this.hotelService.updateHotel(hotel)
      ),
      map(() => updateHotelSuccess()),
      catchError((error) =>
        of(
          updateHotelFailure({
            error: error.message || 'Error while updating hotel',
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

  addRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoom),
      switchMap(({ hotelId, room }: { hotelId: string; room: Room }) =>
        this.hotelService.addNewRoom(hotelId, room)
      ),
      map(() => addRoomSuccess()),
      catchError((error) => of(addHotelFailure({ error: error.message })))
    )
  );

  updateRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRoom),
      switchMap(
        ({
          hotelId,
          roomId,
          room,
        }: {
          hotelId: string;
          roomId: string;
          room: Room;
        }) => this.hotelService.updateRoom(hotelId, roomId, room)
      ),
      map(() => updateHotelSuccess()),
      catchError((error) =>
        of(
          updateHotelFailure({
            error: error.message || 'Error while updating room',
          })
        )
      )
    )
  );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRoom),
      switchMap(({ hotelId, roomId }: { hotelId: string; roomId: string }) =>
        this.hotelService.deleteRoom(hotelId, roomId)
      ),
      map(() => deleteRoomSuccess()),
      catchError((error) =>
        of(
          deleteRoomFailure({
            error: error.message || 'Error while deleting room',
          })
        )
      )
    )
  );
}
