import { createAction, props } from '@ngrx/store';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { Room } from 'src/app/interfaces/room-interface';
import { SearchFilters } from 'src/app/interfaces/search-filters.interface';

export const getHotels = createAction('[Hotels] get hotels');
export const getHotelsSuccess = createAction(
  '[Hotels] get hotels: success',
  props<{ hotels: Hotel[] }>()
);
export const getHotelsFailure = createAction(
  '[Hotels] get hotels: failure',
  props<{ error: string }>()
);
//
//
export const getFilteredHotels = createAction(
  '[Hotels] get hotels',
  props<{ filters: SearchFilters }>()
);
export const getFilteredHotelsSuccess = createAction(
  '[Hotels] get hotels: success',
  props<{ hotels: Hotel[] }>()
);
export const getFilteredHotelsFailure = createAction(
  '[Hotels] get hotels: failure',
  props<{ error: string }>()
);
//
//
export const addHotel = createAction(
  '[Hotels] add hotel',
  props<{ hotel: Hotel }>()
);
export const addHotelSuccess = createAction('[Hotels] add hotel: success');
export const addHotelFailure = createAction(
  '[Hotels] add hotel: failure',
  props<{ error: string }>()
);
//
//
export const updateHotel = createAction(
  '[Hotels] update hotel',
  props<{ hotel: Hotel }>()
);
export const updateHotelSuccess = createAction(
  '[Hotels] update hotel: success'
);
export const updateHotelFailure = createAction(
  '[Hotels] update hotel: failure',
  props<{ error: string }>()
);
//
//
export const deleteHotel = createAction(
  '[Hotels] delete hotel',
  props<{ id: string }>()
);
export const deleteHotelSuccess = createAction(
  '[Hotels] delete hotel: success'
);
export const deleteHotelFailure = createAction(
  '[Hotels] delete hotel: failure',
  props<{ error: string }>()
);
//
//
export const addRoom = createAction(
  '[Hotels] add room',
  props<{ hotelId: string; room: Room }>()
);
export const addRoomSuccess = createAction('[Hotels] add room: success');
export const addRoomFailure = createAction(
  '[Hotels] add room: failure',
  props<{ error: string }>()
);
//
//
export const updateRoom = createAction(
  '[Hotels] update room',
  props<{ hotelId: string; roomId: string; room: Room }>()
);
export const updateRoomSuccess = createAction('[Hotels] update room: success');
export const updateRoomFailure = createAction(
  '[Hotels] update room: failure',
  props<{ error: string }>()
);
//
//
export const deleteRoom = createAction(
  '[Hotels] delete room',
  props<{ hotelId: string; roomId: string }>()
);
export const deleteRoomSuccess = createAction('[Hotels] delete room: success');
export const deleteRoomFailure = createAction(
  '[Hotels] delete room: failure',
  props<{ error: string }>()
);
