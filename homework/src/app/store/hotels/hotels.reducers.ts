import { createReducer, on } from '@ngrx/store';
import {
  addHotel,
  addHotelSuccess,
  addRoom,
  addRoomFailure,
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
  updateRoomFailure,
  updateRoomSuccess,
} from './hotels.actions';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';

export const initialState: HotelState = {
  hotels: [],
  isLoading: false,
  error: '',
  filters: {},
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
  //
  //
  on(getFilteredHotels, (state, action) => ({
    ...state,
    isLoading: true,
    error: '',
    filters: action.filters,
  })),
  on(getFilteredHotelsSuccess, (state, action) => ({
    ...state,
    hotels: action.hotels,
    isLoading: false,
    error: '',
  })),
  on(getFilteredHotelsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //
  //
  on(addHotel, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(addHotelSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(addRoomFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //
  //
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
  })),
  //
  //
  on(updateHotel, (state, action) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(updateHotelSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: '',
  })),
  on(updateHotelFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //
  //
  on(addRoom, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(addRoomSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(addRoomFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //
  //
  on(updateRoom, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(updateRoomSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(updateRoomFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //
  //
  on(deleteRoom, (state, action) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(deleteRoomSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: '',
  })),
  on(deleteRoomFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
