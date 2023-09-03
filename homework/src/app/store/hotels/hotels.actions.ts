import { createAction, props } from '@ngrx/store';
import { Hotel } from 'src/app/interfaces/hotel.interface';

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
