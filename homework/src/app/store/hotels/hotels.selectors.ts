import { HotelState } from './../../interfaces/hotel-state.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectFeature = createFeatureSelector<HotelState>('hotels');

export const hotelsSelector = createSelector(
  selectFeature,
  (state: HotelState) => state.hotels
);
