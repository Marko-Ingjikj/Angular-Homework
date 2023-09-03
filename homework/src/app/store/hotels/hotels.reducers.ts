import { createReducer, on } from '@ngrx/store';
import {
  deleteHotel,
  deleteHotelFailure,
  deleteHotelSuccess,
  getHotels,
  getHotelsFailure,
  getHotelsSuccess,
} from './hotels.actions';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';

export const initialState: HotelState = {
  hotels: [],
  isLoading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(getHotels, (state, action) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(getHotelsSuccess, (state, action) => ({
    ...state,
    hotels: action.hotels,
    isLoading: false,
    error: '',
  })),
  on(getHotelsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(deleteHotel, (state, action) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(deleteHotelSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: '',
  })),
  on(deleteHotelFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
